package com.gamul.api.controller;

import com.gamul.api.request.UserLoginPostReq;
import com.gamul.api.request.UserLogoutPostReq;
import com.gamul.api.response.UserLoginPostRes;
import com.gamul.api.service.UserService;
import com.gamul.common.model.response.BaseResponseBody;
import com.gamul.common.util.JwtTokenUtil;
import com.gamul.common.util.Token;
import com.gamul.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
        String username = loginInfo.getUserName();
        String password = loginInfo.getPassword();

        User user = new User();
        try{
            user = userService.getUserByUsername(username);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "Invalid User", null));
        }
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if(passwordEncoder.matches(password, user.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            Token token = JwtTokenUtil.getToken(username);
            user.setRefreshToken(token.getRefreshToken());
            if(userService.saveUser(user) == null) return ResponseEntity.status(500).body(UserLoginPostRes.of(500, "Internal Server Error", null));
            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", token));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
    }

    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "<strong>아이디</strong>를 통해 토큰을 만료 시킨 후 로그아웃 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> logout(@RequestBody @ApiParam(value="토큰 정보", required = true) UserLogoutPostReq userLogoutPostReq){
        userService.logout(userLogoutPostReq.getUserName());
        return ResponseEntity.ok(BaseResponseBody.of(200, "Logout"));
    }

    @PostMapping("/refresh")
    @ApiOperation(value = "토큰 재발행", notes = "<strong>refresh Token</strong>을 통해 access Token을 재발행 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "refresh token 만료"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserLoginPostRes> validateRefreshToken(@RequestHeader(value = "access_token") String accessToken, @RequestHeader(value = "refresh_token") String refreshToken){
        try{
            accessToken = userService.refreshToken(refreshToken);
        } catch (AccessDeniedException e){
            Token token = Token.builder().accessToken(accessToken).refreshToken(refreshToken).build();
            return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "유효하지 않은 토큰입니다", token));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(UserLoginPostRes.of(500, "Internal Server Error", null));
        }
        Token token = Token.builder().accessToken(accessToken).refreshToken(refreshToken).build();
        return ResponseEntity.status(200).body(UserLoginPostRes.of(200, "Invalid Password", token));

    }
}

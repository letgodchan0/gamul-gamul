package com.gamul.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.gamul.common.auth.GamulUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtTokenUtil {
    private static String secretKey;

    private static String refreshsecretKey;
    private static Integer expirationTime;

    private static Long refreshexpirationTime;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "gamul.com";

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secretKey, @Value("${jwt.refreshsecret}") String refreshsecretKey, @Value("${jwt.expiration}") Integer expirationTime, @Value("${jwt.refreshexpiration}") Long refreshexpirationTime) {
        this.secretKey = secretKey;
        this.refreshsecretKey = refreshsecretKey;
        this.expirationTime = expirationTime;
        this.refreshexpirationTime = refreshexpirationTime;
    }

    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public static Token getToken(String userId) {
        String accessToken =  createToken(userId, "access");
        String refreshToken =  createToken(userId, "refresh");
        return Token.builder().accessToken(accessToken).refreshToken(refreshToken).key(userId).build();
    }

    public static Date getTokenExpiration(int expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    public static Date getTokenExpiration(Long expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public static void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public static String validateRefreshToken(Token refreshTokenObj) throws AccessDeniedException {
        // refresh ???????????? refreshToken ??????
        String refreshToken = refreshTokenObj.getRefreshToken();

        try {
            // ??????
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(refreshToken);

            //refresh ????????? ??????????????? ????????? ????????? ??????, ????????? access ????????? ???????????????.
            if (!claims.getBody().getExpiration().before(new Date())) {
                return createToken(claims.getBody().get("sub").toString(), "access");
            }
        }catch (Exception e) {
            //refresh ????????? ??????????????? ??????, ???????????? ???????????????.
            throw new AccessDeniedException("???????????? ???????????????");
        }

        throw new AccessDeniedException("???????????? ???????????????");
    }

    public static String createToken(String userId, String type){
        Date expires = new Date();
        String key = "";
        if(type.equals("access")){
            expires = JwtTokenUtil.getTokenExpiration(expirationTime);
            key = secretKey;
        } else if(type.equals("refresh")) {
            expires = JwtTokenUtil.getTokenExpiration(refreshexpirationTime);
            key = refreshsecretKey;
        }

        //Token ??????
        String token =  JWT.create()
                .withSubject(userId)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(key.getBytes()));

        return token;
    }

    public static String getCurrentName(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = null;
        if(authentication.getPrincipal() instanceof GamulUserDetails){
            GamulUserDetails springSecurityUser = (GamulUserDetails) authentication.getPrincipal();
            name = springSecurityUser.getUsername();
        } else if(authentication.getPrincipal() instanceof String){
            name = (String) authentication.getPrincipal();
        }

        return name;
    }
}

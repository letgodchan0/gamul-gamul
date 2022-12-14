package com.gamul.api.controller;

import com.gamul.api.request.*;
import com.gamul.api.response.AllergyAlarmRes;
import com.gamul.api.response.IngredientLimitPriceRes;
import com.gamul.api.response.NoticeRes;
import com.gamul.api.service.AlarmService;
import com.gamul.api.service.DailyPriceService;
import com.gamul.api.service.UserService;
import com.gamul.db.entity.*;
import com.gamul.db.repository.IngredientRepository;
import com.gamul.db.repository.NoticeRepository;
import com.google.gson.Gson;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 알람 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "알람 API", tags = {"Alarm."})
@RestController
@RequestMapping("/api/v1/user")
public class AlarmController {
    @Autowired
    AlarmService alarmService;
    @Autowired
    UserService userService;
    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    DailyPriceService dailyPriceService;
    @Autowired
    NoticeRepository noticeRepository;
    private java.lang.Exception Exception;

    @PostMapping("/allergy")
    @ApiOperation(value = "알러지 등록/해제", notes = "식재료별 <strong>알러지</strong>를 등록 혹은 해제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> allergyAlarm(@RequestBody @ApiParam(value="알러지 정보", required = true)IngredientAllergyRegisterPostReq ingredientAllergyRegisterPostReq){
        try{
            alarmService.deleteMyAllergy(ingredientAllergyRegisterPostReq.getUserName());
            alarmService.saveAllAlergy(changeAllergy(ingredientAllergyRegisterPostReq.getUserName(), ingredientAllergyRegisterPostReq.getIngredientList()));
        } catch (Exception e){
            return ResponseEntity.status(500).body("Internal Server Error");
        }
        return ResponseEntity.status(200).body("Success");
    }

    List<Allergy> changeAllergy(String username, List<Long> list){
        List<Allergy> allergyList = new ArrayList<>();
        User user = userService.getUserByUsername(username);
        for(Long ingredientId : list){
            allergyList.add(new Allergy(user, ingredientRepository.findById(ingredientId).orElseGet(null)));
        }
        return allergyList;
    }

    @PostMapping("/notice")
    @ApiOperation(value = "상하한가 알림 등록/해제", notes = "식재료별 <strong>상하한가</strong>를 등록 혹은 해제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> noticeAlarm(@RequestBody @ApiParam(value="가격 알림 정보", required = true)IngredientLimitPricePostReq ingredientLimitPricePostReq){
        try{
            alarmService.deleteMyNotice(ingredientLimitPricePostReq.getUserName());
            List<IngredientPriceNotice> list = alarmService.saveAllIngredientPriceNotice(changeIngredientPriceNotice(ingredientLimitPricePostReq.getUserName(), ingredientLimitPricePostReq.getIngredientList()));
            List<Notice> noticeList = new ArrayList<>();
            for(IngredientPriceNotice ingredientPriceNotice : list) {
                Day day = dailyPriceService.findDailyPrice(ingredientPriceNotice.getIngredient().getId(), 1);
                Notice notice;
                if(day != null){
                    if(day.getPrice() < ingredientPriceNotice.getLowerLimitPrice()){
                        notice = new Notice(ingredientPriceNotice, false);
                        noticeRepository.save(notice);
                        sendNotice(notice);
                    }
                    if (day.getPrice() > ingredientPriceNotice.getUpperLimitPrice()){
                        notice = new Notice(ingredientPriceNotice, true);
                        noticeRepository.save(notice);
                        sendNotice(notice);
                    }
                }
            }
        } catch (Exception e){
            return ResponseEntity.status(500).body("Internal Server Error");
        }
        return ResponseEntity.status(200).body("Success");
    }

    List<IngredientPriceNotice> changeIngredientPriceNotice(String username, List<IngredientPricePostReq> priceList){
        List<IngredientPriceNotice> list = new ArrayList<>();
        User user = userService.getUserByUsername(username);
        for(IngredientPricePostReq ingredient : priceList){
            list.add(new IngredientPriceNotice(user, ingredientRepository.findById(ingredient.getIngredientId()).orElseGet(null), ingredient.getLowerLimitPrice(), ingredient.getUpperLimitPrice()));
        }
        return list;
    }

    @GetMapping("/allergy/{userName}")
    @ApiOperation(value = "알러지 전체 조회", notes = "유저별 <strong>알러지</strong>를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getAllergyList(@PathVariable String userName){
        User user = new User();
        try{
            user = userService.getUserByUsername(userName);
        } catch (Exception e){
            return ResponseEntity.ok(AllergyAlarmRes.of(401, "인증 실패", null));
        }
        try{
            List<Allergy> allergyList = alarmService.getAllergyList(user);
            List<Long> list = new ArrayList<>();
            for(Allergy allergy : allergyList) {
                list.add(allergy.getIngredient().getId());
            }
            return ResponseEntity.status(200).body(list);
        } catch (Exception e){
            return ResponseEntity.status(500).body("Internal Server Error");
        }

    }

    @GetMapping("/notice/{userName}")
    @ApiOperation(value = "상하한가 알림 전체 조회", notes = "유저별 <strong>상하한가 알림</strong>를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getNoticeList(@PathVariable String userName){
        User user = new User();
        try{
            user = userService.getUserByUsername(userName);
        } catch (Exception e){
            return ResponseEntity.status(401).body("인증 실패");
        }
        try{
            List<IngredientPriceNotice> noticeList = alarmService.getNoticeList(user);
            List<IngredientLimitPriceRes> list = new ArrayList<>();
            for(IngredientPriceNotice notice : noticeList) {
                list.add(IngredientLimitPriceRes.builder().ingredientId(notice.getIngredient().getId())
                        .lowerLimitPrice(notice.getLowerLimitPrice())
                        .upperLimitPrice(notice.getUpperLimitPrice()).build());
            }
            return ResponseEntity.status(200).body(list);
        } catch (Exception e){
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @GetMapping("/notice/{userName}/{ingredientId}")
    @ApiOperation(value = "상하한가 알림 상세 조회", notes = "유저별 <strong>상하한가 알림</strong>를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getNoticeDetail(@PathVariable String userName, @PathVariable Long ingredientId){
        User user = new User();
        try{
            user = userService.getUserByUsername(userName);
        } catch (Exception e){
            return ResponseEntity.status(401).body("인증 실패");
        }
        IngredientPriceNotice ingredientPriceNotice = alarmService.getNoticeDetail(user, ingredientId);
        IngredientLimitPriceRes ingredientLimitPriceRes;
        if(ingredientPriceNotice == null) {
            ingredientLimitPriceRes = IngredientLimitPriceRes.builder()
                    .ingredientId(ingredientId)
                    .upperLimitPrice(0)
                    .lowerLimitPrice(0).build();
        }
        else ingredientLimitPriceRes = IngredientLimitPriceRes.builder()
                .ingredientId(ingredientPriceNotice.getIngredient().getId())
                .upperLimitPrice(ingredientPriceNotice.getUpperLimitPrice())
                .lowerLimitPrice(ingredientPriceNotice.getLowerLimitPrice()).build();
        return ResponseEntity.status(200).body(ingredientLimitPriceRes);
    }

    @PostMapping("/notice/regist")
    @ApiOperation(value = "알림을 위한 정보 등록", notes = "유저별 <strong>알람 정보</strong>를 등록한다")
    public ResponseEntity<?> getNoticeDetail(@RequestBody  @ApiParam(value="알람 설정 정보", required = true) AlarmRegisterReq alarmRegisterReq){

        User user = userService.getUserByUsername(alarmRegisterReq.getUserName());
        user.setSubscription(alarmRegisterReq.getSubscription());
        userService.saveUser(user);
        return ResponseEntity.status(200).body("Success");
    }

    @GetMapping ("/notice/send")
    @Scheduled(cron = "0 0 1 * * *", zone = "Asia/Seoul")
    @ApiOperation(value = "모든 유저에게 알림 전송", notes = "유저별 <strong>알람</strong>을 전송한다")
    public ResponseEntity<?> sendNoticeToAllUsers(){
        List<Notice> list = alarmService.getAllNotice();

        try {
            for (Notice notice : list) {
                sendNotice(notice);
            }
        } catch (Exception e){
            return ResponseEntity.status(500).body("Internal Server Error");
        }

        return ResponseEntity.status(200).body("Success");
    }

    public void sendNotice(Notice notice) throws Exception{
        DecimalFormat decFormat = new DecimalFormat("###,###");
        RestTemplate rt = new RestTemplate();
        String json = notice.getIngredientPriceNotice().getUser().getSubscription();
        Gson gson = new Gson();
        Map<String, String> map = gson.fromJson(json, Map.class);
        Day day = dailyPriceService.findDailyPrice(notice.getIngredientPriceNotice().getIngredient().getId(), 1);
        if (day == null)
            day = dailyPriceService.findDailyPrice(notice.getIngredientPriceNotice().getIngredient().getId(), 0);
        if (day == null)
            throw Exception;
        String info = " - " + decFormat.format(day.getPrice()) + "원/" + day.getQuantity() + day.getUnit();
        NoticeRes send = new NoticeRes(notice, info);
        Map<String, Object> params = new HashMap<>();
        params.put("subscription", map);
        params.put("title", send.getTitle());
        params.put("message", send.getMessage());
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://j7a305.p.ssafy.io/api/notification",
                HttpMethod.POST,
                entity,
                String.class
        );
    }

    @PostMapping("notice/list")
    @ApiOperation(value = "유저별 알람 조회", notes = "유저별 <strong>알람</strong>을 조회한다")
    public ResponseEntity<?> getNoticeList(@RequestBody @ApiParam(value="알람 설정 정보", required = true)IngredientAllergyListReq usernameReq) {
        DecimalFormat decFormat = new DecimalFormat("###,###");
        try{
            User user = userService.getUserByUsername(usernameReq.getUserName());
            List<Notice> noticeList = alarmService.getAllNoticeByUser(user);
            List<NoticeRes> list = new ArrayList<>();
            for(Notice notice : noticeList){
                Day day = dailyPriceService.findDailyPrice(notice.getIngredientPriceNotice().getIngredient().getId(), 1);
                if (day == null) day = dailyPriceService.findDailyPrice(notice.getIngredientPriceNotice().getIngredient().getId(), 0);
                String info = " - " +  decFormat.format(day.getPrice()) + "원/" + day.getQuantity() + day.getUnit();
                list.add(new NoticeRes(notice, info));
            }

            return ResponseEntity.status(200).body(list);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

//    @Scheduled(fixedRate = 10000)
//    @GetMapping("/send")
//    public @ResponseBody ResponseEntity<String> send() throws JSONException, InterruptedException {
//        String notifications = new Date().toString();
//        HttpEntity<String> request = new HttpEntity<>(notifications);
//        CompletableFuture<String> pushNotification = CompletableFuture.supplyAsync(() -> notifications);
//        CompletableFuture.allOf(pushNotification).join();
//
//        try{
//            String firebaseResponse = pushNotification.get();
//            return new ResponseEntity<>(firebaseResponse, HttpStatus.OK);
//        }
//        catch (InterruptedException e){
//            System.out.println("got interrupted!");
//            throw new InterruptedException();
//        }
//        catch (ExecutionException e){
//            System.out.println("execution error!");
//        }
//
//        return new ResponseEntity<>("Push Notification ERROR!", HttpStatus.BAD_REQUEST);
//    }
}

// Express.js를 사용하여 로그인, 로그아웃, 비밀번호 찾기 등의 요청을 처리
const express = require('express');
const router = express.Router();
const loginService = require('../../services/access/login_service.js');


// 로그인 요청을 처리하는 라우터
router.post('/login', async (req, res) => {
  try {
    // 사용자가 입력한 사원번호와 비밀번호를 로그인 서비스에 전달 
    // 로그인 서비스는 사원번호로 직원 정보를 찾고, 비밀번호가 맞으면 직원 정보를 반환하고, 틀리면 null을 반환
    const result = await loginService.loginByEmpNo(req.body);
    res.json(result);
  } catch (err) {
    // 문제가 생겼을 때 에러 메시지 보내기
    console.error('로그인 라우터 오류:', err);
    res.status(500).json({
      result: false,
      message: '로그인 처리 중 오류가 발생했습니다.'
    });
  }
});


// 로그아웃 요청을 처리하는 라우터
router.get('/logout', (req, res) => {
  req.session.destroy(); // 서버에 저장된 사용자의 세션 데이터를 제거하고 로그아웃 처리
  res.send({
    result: true // 로그아웃 성공 응답
  });
});


// 비밀번호 찾기 요청을 처리하는 라우터
router.post('/find-password', async (req, res) => {
  try {
    const { email } = req.body;
    const result = await loginService.findPassword(email);
    res.json(result);
  } catch (err) {
    console.error('비밀번호 찾기 라우터 오류:', err);
    res.status(500).json({
      result: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});


// 비밀번호 변경 요청을 처리하는 라우터
// router.put('/pwd', async (req, res) => {
//     try {
//         // 사용자가 입력한 사원번호와 새 비밀번호를 로그인 서비스에 전달
//         // 로그인 서비스는 비밀번호를 업데이트하고 성공 여부를 반환
//         const success = await loginService.updatePwd(
//             req.body.emp_no,
//             req.body.new_pwd
//         );

//        // 비밀번호 변경 성공 여부에 따라 응답
//         if (success) {
//             res.json({
//                 result: true,
//                 message: '비밀번호가 변경되었습니다.'
//             });
//         } else {
//             res.json({
//                 result: false,
//                 message: '비밀번호 변경에 실패했습니다.'
//             });
//         }
//     } catch(err) {
//         // 비밀번호 변경 중 오류가 발생하면 500 상태 코드와 함께 오류 메시지를 반환
//         console.error('비밀번호 변경 라우터 오류:', err);
//         res.status(500).json({
//             result: false,
//             message: '비밀번호 변경 중 오류가 발생했습니다.'
//         });
//     }
// });


// 비밀번호 재설정 요청을 처리하는 라우터
router.post('/reset-password', async (req, res) => {
  try {
    const { empNo, newPassword } = req.body;
    if (!empNo || !newPassword) {
      return res.status(400).json({
        result: false,
        message: '모든 필드를 입력해주세요.'
      });
    }
    const result = await loginService.resetPassword(empNo, newPassword);
    res.json(result);
  } catch (err) {
    console.error('비밀번호 재설정 라우터 오류:', err);
    res.status(500).json({
      result: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

module.exports = router;
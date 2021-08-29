export default {
  success: {
    // user
    SUCCESS_TO_SIGN_IN: "로그인 성공",
    SUCCESS_TO_SIGN_OUT: "로그아웃 완료",
    SUCCESS_TO_SIGN_UP: "회원가입 완료",

    // cart
    SUCCESS_TO_CREATE_CART: "장바구니 생성 성공",
    SUCCESS_TO_UPDATE_CART: "장바구니 수정 성공",
    SUCCESS_TO_DELETE_CART: "장바구니 삭제 성공",

    // destination
    SUCCESS_TO_CREATE_DESTINATION: "배송지 생성 성공",
    SUCCESS_TO_UPDATE_DESTINATION: "배송지 수정 성공",
    SUCCESS_TO_UPDATE_DEFAULT_DESTINATION: "기본 배송지 수정 성공",
    SUCCESS_TO_DELETE_DESTINATION: "배송지 삭제 성공",

    // order
    SUCCESS_TO_UPDATE_ORDER_STATUS: "주문 상태 수정 성공",

    // review
    SUCCESS_TO_CREATE_REVIEW: "리뷰 생성 성공",
    SUCCESS_TO_UPDATE_REVIEW: "리뷰 수정 성공",
    SUCCESS_TO_DELETE_REVIEW: "리뷰 삭제 성공",
  },
  failed: {
    // user
    FAILED_TO_SIGN_IN: "이메일 또는 비밀번호가 다릅니다",
    FAILED_TO_GEN_JWT: "json web token 생성 실패",
    FAILED_TO_SIGN_UP: "계정생성에 실패했습니다.",
    FAILED_TO_SIGN_OUT: "로그아웃에 실패했습니다.",
    FAILED_TO_ADD_DESTINATION: "주소 생성 실패",
    EMAIL_EXIST: "이미 존재하는 이메일입니다",
    FAIL_GET_ACCESS_TOKEN: "엑세스 토큰을 얻어오는 데 실패했습니다",
    FAILED_TO_INSERT_ES: "검색 DB에 저장 실패",

    //cart
    FAILED_TO_FIND_CARTS_BY_USER_ID: "장바구니 가져오기 실패",
    FAILED_TO_CREATE_CART: "장바구니 생성 실패",
    FAILED_TO_UPDATE_CART: "장바구니 수정 실패",
    FAILED_TO_DELETE_CART: "장바구니 삭제 실패",

    // destination
    FAILED_TO_FIND_DESTINATIONS_BY_USER_ID: "유저id로 배송지 가져오기 실패",
    FAILED_TO_CREATE_DESTINATION: "배송지 생성 실패",
    FAILED_TO_UPDATE_DESTINATION: "배송지 수정 실패",
    FAILED_TO_UPDATE_DEFAULT_DESTINATION: "기본 배송지 수정 실패",
    FAILED_TO_DELETE_DESTINATION: "배송지 삭제 실패",

    // order
    FAILED_TO_FIND_ORDER_BY_ID: "주문id로 주문 가져오기 실패",
    FAILED_TO_FIND_ORDER_BY_ORDER_NUM: "주문번호로 주문 가져오기 실패",
    FAILED_TO_FIND_ORDERS_BY_USER_ID: "유저id로 주문 가져오기 실패",
    FAILED_TO_FIND_ORDERS: "전체 주문 가져오기 실패",
    FAILED_TO_CREATE_ORDER: "주문 생성 실패",
    FAILED_TO_UPDATE_ORDER: "주문 수정 실패",
    FAILED_TO_UPDATE_ORDER_NUM: "주문번호 수정 실패",
    FAILED_TO_UPDATE_ORDER_STATUS: "주문 상태 수정 실패",

    // review
    FAILED_TO_CREATE_REVIEW: "리뷰 생성 실패",
    FAILED_TO_UPDATE_REVIEW: "리뷰 수정 실패",
    FAILED_TO_DELETE_REVIEW: "리뷰 삭제 실패",
    FAILED_TO_FIND_RECENT_REVIEWS: "최근 리뷰 가져오기 실패",
  },
};

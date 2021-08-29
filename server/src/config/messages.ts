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

    // question
    SUCCESS_TO_CREATE_QUESTION: "문의 생성 성공",
    SUCCESS_TO_UPDATE_QUESTION: "문의 수정 성공",
    SUCCESS_TO_DELETE_QUESTION: "문의 삭제 성공",
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
    FAILED_TO_DELTE_ES: "검색 DB에 인덱스 삭제 실패",
    FAILTED_TO_FIND_MY_INFO: "회원 정보를 불러오는데 실패했습니다.",
    FAILTED_TO_EDIT_MY_INFO: "회원 정보를 수정하는데 실패했습니다.",

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
    FAILED_TO_FIND_MY_REVIEW: "나의 리뷰 가져오기 실패",
    FAILED_TO_FIND_REVIEWS_BY_PROUCY_ID: "상품id로 리뷰 가져오기 실패",

    // questoin
    FAILED_TO_FIND_QUESTIONS_BY_PRODUCT_ID: "상품id로 문의 가져오기 실패",
    FAILED_TO_CREATE_QUESTION: "문의 생성 실패",
    FAILED_TO_UPDATE_QUESTION: "문의 수정 실패",
    FAILED_TO_DELETE_QUESTION: "문의 삭제 실패",
    FAILED_TO_FIND_QUESTIONS_BY_USER_ID: "유저id로 문의 가져오기 실패",

    //wish
    FAILED_TO_FIND_MY_WISHES: "나의 찜목록 불러오기 실패",
    FAILED_TO_CREATE_MY_WISH: "상품 찜하기 실패",
    FAILED_TO_DELETE_MY_WISH: "상품 찜하기 해제 실패",

    //product
    FAILED_TO_FIND_PRODUCTS_BY_QUERIE: "해당 query에 맞는 상품 조회 실패 ",
    FAILED_TO_FIND_ALL_PRODUCTS_BY_KEYWORD:
      "키워드에 해당하는 모든 상품 조회 실패",
    FAILED_TO_FIND_PRODUCT_BY_ID: "상품id로 상품 정보 조회 실패",
    FAILED_TO_CREATE_PRODUCT: "상품 등록 실패",
    FAILED_TO_DELETE_PRODUCT: "상품 삭제 실패",
  },
};

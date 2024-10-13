// LIVE;
export const BASE_URL = "https://api.lavyacompany.com/api/v1";
export const IMAGE_BASE_URL = "https://api.lavyacompany.com/resources/";

// LOCAL;
// export const BASE_URL = "http://192.168.1.13:9291/api/v1";
// export const IMAGE_BASE_URL = "http://192.168.1.13:9291/resources/";

export const ROUTES_CONST = {
    INDEX: '/',
    LOGIN: '/login',
    ABOUT: '/about',
    CONTACT: '/contact',
    CART: '/cart',
    CHECKOUT: '/checkout',
    SUBSCRIPTION_CHECKOUT:'/subscription-checkout/:id',
    USER_DETAIL: '/user-detail',
    PROFILE: '/profile',
    RECHARGE: '/recharge',
    VACATION: '/vacation',
    BILLING_DETAILS: '/billing-details',
    SUBSCRIPTION_PRODUCTS:'/subscription-products',
    ORDERS: '/order-history',
    TERMS_CONDITIONS: '/term-conditions',
    TRANSACTION_HISTORY: "/transaction-history",
    PRODUCT_LIST: '/product-list',
    PRODUCT_DETAIL: "/product-list/:id",
    PAGE_NOT_FOUND: '*',
}

export const API_URL = {
    OTP_BY_CONTACT: '/login/otp-by-contact',
    ADD_USER_DETAILS: '/login/add-user-details',
    EDIT_USER_DETAILS: '/login/edit-user-details/',
    GET_USER_DATA: '/login/user-by-id/',
    GET_ALL_PRODUCT: '/product/get-all-products',
    GET_PRODUCT_DETAIL: '/product/get-product-by-id/',
    GET_ALL_CATEGORIES: '/category/get-all-sub-category',
    GET_ALL_BANNERS: '/banner/get-all-banners',
    GET_ALL_TESTIMONIALS: '/testimonial/get-all-testimonial',
    ADD_TO_CART: '/cart/add-to-cart/',
    DELETE_TO_CART: '/cart/delete-to-cart/',
    GET_ALL_CARTS: '/cart/get-cart-by-user/',
    ADD_TO_SUBSCRIPTION_CART: '/cart/add-subscrption-products/',
    DELETE_TO_SUBSCRIPTION_CART: '/cart/delete-to-cart/',
    GET_ALL_SUBSCRIPTION_CART: '/cart/get-subscription-by-user/',
    GET_ALL_TRANSACTIONS: '/transaction/get-transaction-by-id/',
    ADD_VACATIONS: '/vacation/add-vacation-by-id/',
    GET_ALL_VACATIONS: '/vacation/get-vacation-by-id/',
    DELETE_VACATION: '/vacation/delete-vacation-by-id/',
    GET_ALL_RECHARGES: '/recharge/get-all-offer',
    WALLET_RECHARGE:'/login/recharge-wallet/',
    CREATE_NEW_ORDER: '/order/create-new-order',
    CANCEL_ORDER:'/order/update-order-by-id/',
    GET_ALL_ORDERS: '/subscription/get-order-by-user/',
    CREATE_SUBSCRIPTION_ORDER:'/order/order-subscribed',
    GET_ALL_SUBSCIPTION_ORDERS:'/subscription/get-subscription-by-user/',
    GET_MONTHLY_BILL: '/monthly-bill/get-monthly-bill-by-id/',
    GET_ALL_CONTENT: '/content/get-all-content',
    ADD_ADDRESS:'/subscription/save-new-address/',
    GET_ALL_ADDRESSESS: '/subscription/get-current-user-address/',
    WALLET_AMOUNT_DEDUCTION:'/login/update-wallet-by-id/',
    SUBSCRIBE_USER:"/user-subscribe/user-subscribe"
}

export const GOOGLE_MAP_API_KEY = "AIzaSyA76OKDCbizM99zuhLvExdBx666iLNEAm0";
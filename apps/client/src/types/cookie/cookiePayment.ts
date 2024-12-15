export const getDummyCookiePaymentData = (cookieAmount: number) => {
  const unitPrice = 100; // 1개당 가격
  return {
    cookieAmount,
    totalAmount: cookieAmount * unitPrice, // 총 금액 계산
    message: `Order for ${cookieAmount} cookies`,
    orderId: `ID${Math.random().toString(36).substr(2, 9)}`, // 랜덤 orderId
    orderName: `Cookie Order ${cookieAmount}`,
    paymentMethod: "Card", // 기본값 설정
    paymentWay: "Online", // 기본값 설정
  };
};
// export const cookiePayment = [
//     {

//         "cookieAmount": 50,
//         "totalAmount": 5000,
//         "message": "SE8MG510",
//         "orderId": "TQ3QK3JN",
//         "orderName": "FK19T2HF",
//         "paymentMethod": "Card",
//         "paymentWay": "Online",
//         "requestedAt": "2024-12-14T10:35:33.209064",
//         "approvedAt": "2024-12-14T10:35:33.209084"
//     },
//     {
  
//         "cookieAmount": 500,
//         "totalAmount": 50000,
//         "message": "L411SGTH",
//         "orderId": "S99VJE7N",
//         "orderName": "VZTJRA3F",
//         "paymentMethod": "BankTransfer",
//         "paymentWay": "Offline",
//         "requestedAt": "2024-12-14T10:35:33.209118",
//         "approvedAt": "2024-12-14T10:35:33.209123"
//     },
//     {
    
//         "cookieAmount": 200,
//         "totalAmount": 20000,
//         "message": "OGUD01CJ",
//         "orderId": "R6L9O3AS",
//         "orderName": "52OIQCIJ",
//         "paymentMethod": "Card",
//         "paymentWay": "Offline",
//         "requestedAt": "2024-12-14T10:35:33.209161",
//         "approvedAt": "2024-12-14T10:35:33.209165"
//     },
//     {
      
//         "cookieAmount": 100,
//         "totalAmount": 10000,
//         "message": "2EAOMQMU",
//         "orderId": "CHY5CD32",
//         "orderName": "CEOW9PMA",
//         "paymentMethod": "MobilePayment",
//         "paymentWay": "Online",
//         "requestedAt": "2024-12-14T10:35:33.209190",
//         "approvedAt": "2024-12-14T10:35:33.209194"
//     },
//     {
    
//         "cookieAmount": 300,
//         "totalAmount": 30000,
//         "message": "3KFCVVQ6",
//         "orderId": "6V9MOIP8",
//         "orderName": "05IOU2CR",
//         "paymentMethod": "MobilePayment",
//         "paymentWay": "Online",
//         "requestedAt": "2024-12-14T10:35:33.209218",
//         "approvedAt": "2024-12-14T10:35:33.209223"
//     }
// ]

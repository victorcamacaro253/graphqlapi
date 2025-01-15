import { query } from "../config/db.js";

class tokenModel{

    static async saveRefreshToken(UserId,token,expiresIn){

        const sql = 'INSERT INTO refresh_tokens (user_id,token,expiresIn,revoked) VALUES (?, ?, ?,0)';
        const result= await query(sql,[UserId,token,expiresIn])
        return result
    }
}


export default tokenModel;
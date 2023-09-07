export class JwtHelper {
    private urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: { break; }
            case 2: { output += '=='; break; }
            case 3: { output += '='; break; }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return decodeURIComponent(atob(output));
    }
  
    public decodeToken(token: string): JwtHelper.Jwt {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        const decoded = this.utf8Decode(this.urlBase64Decode(parts[1]));
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }

        const obj = JSON.parse(decoded);
        return {
            email: obj.email,
            unique_name: obj.unique_name,
            sub: obj.sub,
            expiration: new Date(0).addSeconds(obj.exp)
        };
    }

    private utf8Decode(utf8String: string): string {
        if (!utf8String) {
            return utf8String;
        }

        const unicodeString = utf8String.replace(
            /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
            function(c) { 
                var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
                return String.fromCharCode(cc); }
        ).replace(
            /[\u00c0-\u00df][\u0080-\u00bf]/g,
            function(c) {
                var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
                return String.fromCharCode(cc); }
        );

        return unicodeString;
    }
}
export namespace JwtHelper {
    export interface Jwt {
       unique_name: string;
       email: string;
       sub: string;
       expiration: Date;
    }
}
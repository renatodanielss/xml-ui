import { Injectable } from '@angular/core'

@Injectable()
export class CookiesService {
    public get(key: string): string {
        key = key + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(key) == 0) {
                return c.substring(key.length, c.length);
            }
        }
        return null;
    }

    public set(key: string, value: string, expiration?: Date): void {
        let cookie = `${key}=${value};`;

        if (expiration) {
            cookie += ` expires=${expiration.toUTCString()};`
        }

        document.cookie = `${cookie} path=/`;
    }

    public remove(key: string): void {
        const date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        document.cookie = `${key}=; expires=${date.toUTCString()}; path=/`;
    }
}

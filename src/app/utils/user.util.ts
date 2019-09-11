export class UserUtil {

    static isAdm(): boolean {
        const user = this.get();
        return user.roles.includes("ADM");
    }
    static get(): any {
        const data = localStorage.getItem('shopping.user');
        if (!data) return null;
        return JSON.parse(data);
    }
    static set(user: any) {
        localStorage.setItem('shopping.user', JSON.stringify(user));
    }
    static clear() {
        localStorage.removeItem('shopping.user');
    }
}


/// <reference path="../../configs/_all.ts" />
module Travel_World {
    export class LoginModel {
        public email: string;
        public password: string;
        public isAdmin: boolean

        constructor(email?: string, password?: string) {
            this.email = email;
            this.password = password;
        }
    }
} 
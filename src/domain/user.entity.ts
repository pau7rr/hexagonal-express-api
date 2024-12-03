export class UserId {
    constructor(private value: string) {
        if (!value) throw new Error('UserId cannot be empty!');
    }

    getValue(): string {
        return this.value;
    }
}

export class UserEmail {
    constructor(private value: string) {
        if (!this.isValidEmail(this.value)) {
            throw new Error('This email is not valid!');
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getValue(): string {
        return this.value;
    }
}

export class User {
    constructor(
        private id: UserId,
        private name: string,
        private email: UserEmail
    ) {
        this.validate();
    }

    private validate(): void {
        if (!this.name) throw new Error('Name cannot be empty!')
    }

    getId(): UserId {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): UserEmail {
        return this.email;
    }
}
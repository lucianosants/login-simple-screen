class ValidateForm {
	constructor() {
		this.loginForm = document.querySelector('.login-form');
		this.events();
	}

	events() {
		this.loginForm.addEventListener('submit', (e) => {
			this.handleSubmit(e);
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const checkFields = this.checkFields();
		if (checkFields) {
			alert('Login successfully...');
			this.loginForm.submit();
		}
	}

	checkFields() {
		let valid = true;

		for (let errorText of this.loginForm.querySelectorAll('.error')) {
			errorText.remove();
		}

		for (let field of this.loginForm.querySelectorAll('.validate')) {
			const label = field.previousElementSibling.innerHTML;

			if (!field.value) {
				this.createError(field, `Field "${label}" cannot be empty`);
				valid = false;
			}

			if (field.classList.contains('user')) {
				if (!this.validateUser(field)) valid = false;
			}

			if (field.classList.contains('password')) {
				if (!this.validPassword(field)) valid = false;
			}
		}

		return valid;
	}

	validateUser(field) {
		const user = field.value;
		let valid = true;

		if (user.length < 3 || user.length > 12) {
			this.createError(field, 'User must be between 3 and 12 characters');
			valid = false;
		}

		if (!user.match(/^[a-zA-Z0-9]+$/g)) {
			this.createError(field, 'User must be letters and/or numbers');
			valid = false;
		}

		return valid;
	}

	validPassword(field) {
		let valid = true;
		const password = this.loginForm.querySelector('.password');

		if (password.value.length < 3 || password.value.length > 12) {
			valid = false;
			this.createError(
				field,
				'Password must be between 3 and 12 characters'
			);
		}

		if (!password.value.match(/^[a-zA-Z0-9]+$/g)) {
			this.createError(field, 'User must be letters and/or numbers');
			valid = false;
		}

		return valid;
	}

	createError(field, message) {
		const div = document.createElement('div');
		div.innerHTML = message;
		div.classList.add('error');
		field.insertAdjacentElement('afterend', div);
	}
}

const loginForm = new ValidateForm();

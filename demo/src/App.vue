<template>
	<div id="app">
		<div>
			<div><span>Name: {{ form.name.error }}</span></div>
			<input type="text" v-on:change="e => set('name', e.target.value, form)" />
		</div>
		<div>
			<div><span>Email: {{ form.email.error }}</span></div>
			<input type="text" v-on:change="e => set('email', e.target.value, form)" />
		</div>
		<div>
			<div><span>Gender: {{ form.gender.error }}</span></div>
			<select v-on:change="e => set('gender', e.target.value, form)">
				<option>Select gender</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
		</div>

		<button :disabled="!validate(form)">Click me</button>
	</div>
</template>

<script>
import { required, maxLength, isEmail, isValue, set, validate } from 'vue-val';

export default {
	name: 'app',
	data() {
		return {
			set,
			validate,
			form: {
				name: {
					valid: false,
					error: null,
					constraints: [required, maxLength(20)]
				},
				email: {
					valid: false,
					error: null,
					constraints: [required, isEmail]
				},
				gender: {
					valid: false,
					error: null,
					constraints: [isValue(['male', 'female'])]
				}
			}
		};
	}
}
</script>

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

		<button :disabled="!validate(form)">Click me</button>
	</div>
</template>

<script>
import { required, maxLength } from 'vue-val';
import { set, validate } from 'vue-val/utils';

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
					constraints: [required]
				}
			}
		};
	}
}
</script>

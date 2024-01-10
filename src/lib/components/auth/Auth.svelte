<script>
	import { authenticated, profile } from '$lib/store/auth';
	import { setProfile } from '$lib/utils/profile';

	let login = true;

	let loginForm = {
		email: '',
		password: ''
	};

	const doLogin = async () => {
		const res = await fetch('/api/login', {
			method: 'post',
			body: JSON.stringify(loginForm)
		});
		const data = await res.json();
		await setProfile(data);
		console.log($profile);
		authenticated.set(true);
	};

	let signupForm = {
		email: '',
		firstName: '',
		lastName: '',
		password: ''
	};
	const doSignUp = async () => {
		const res = await fetch('/api/signup', {
			method: 'post',
			body: JSON.stringify(signupForm)
		});
		const data = await res.json();
		await setProfile(data);
		authenticated.set(true);
	};
</script>

<div class="bg-slate-400  w-screen h-screen grid items-center justify-center p-4">
	<form
		class="bg-white p-4 h-fit w-fit min-w-[120px] flex flex-col gap-4 rounded-lg shadow-sxl"
		on:submit|preventDefault={async () => {
			if (login) await doLogin();
			else doSignUp();
		}}
	>
		{#if login}
			<h4 class="text-2xl">Log in</h4>
			<input type="email" placeholder="example@mail.com" required bind:value={loginForm.email} />
			<input type="password" placeholder="password" required bind:value={loginForm.password} />
			<button class="bg-green-500 p-1 rounded-md text-white text-sm" type="submit">Log in</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class="text-sm text-green-700 underline cursor-pointer"
				on:click={() => (login = !login)}
			>
				Not signed up yet?
			</span>
		{:else}
			<h4 class="text-2xl">Sign up</h4>
			<input type="text" placeholder="First name" required bind:value={signupForm.firstName} />
			<input type="text" placeholder="Last name" required bind:value={signupForm.lastName} />
			<input type="email" placeholder="example@mail.com" required bind:value={signupForm.email} />
			<input type="password" placeholder="password" required bind:value={signupForm.password} />
			<button class="bg-green-500 p-1 rounded-md text-white text-sm" type="submit">Sign up</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class="text-sm text-green-700 underline cursor-pointer"
				on:click={() => (login = !login)}
			>
				Log in instead.
			</span>
		{/if}
	</form>
</div>

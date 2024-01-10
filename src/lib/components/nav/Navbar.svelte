<script>
	import { HomeIcon, UsersIcon, BookOpenIcon, StarIcon, UserIcon } from 'svelte-feather-icons';

	const routes = [
		{
			Icon: HomeIcon,
			name: 'Dashboard',
			route: '/'
		},
		{
			Icon: UsersIcon,
			name: 'Ministries',
			route: '/ministries'
		},
		{
			Icon: BookOpenIcon,
			name: 'Library',
			route: '/library'
		},
		{
			Icon: StarIcon,
			name: 'Events',
			route: '/events'
		},
		{
			Icon: UserIcon,
			name: 'Profile',
			route: '/profile'
		}
	];
</script>

<nav class="">
	<div class="grid bg-white text-[12px] p-2">
		{#each routes as { Icon, name, route }}
			<a href={route} class="flex gap-2 p-2 hover:text-slate-400">
				<Icon size="20" />
				<span>
					{name}
				</span>
			</a>
		{/each}
	</div>
</nav>

<style>
</style>

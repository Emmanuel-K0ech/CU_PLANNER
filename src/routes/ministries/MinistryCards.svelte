<script>
	import { ministries } from '$lib/store/data';
</script>

<div class="flex flex-col p-4 gap-4">
	{#if $ministries.length == 0}
		<p>Loading ...</p>
	{:else}
		{#each $ministries as { name, description, whatsapp, img_src }}
			<div class="p-2 bg-white flex flex-col gap-4 rounded-md">
				<img src={img_src} alt="{name} - image" class="w-full aspect-video object-cover" />
				<h4 class="font-bold">{name}</h4>
				<p class="text-gray-600 text-sm">{description}</p>
				<a href={whatsapp} class="text-green-500 underline">{whatsapp}</a>
			</div>
		{/each}
	{/if}
</div>

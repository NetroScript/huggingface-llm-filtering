<script lang="ts">

  import type {Model} from "$lib/huggingfaceAPI";
  import {relativeTime} from 'svelte-relative-time'
  import PhDownloadSimpleBold from '~icons/ph/download-simple-bold'
  import PhHeartBold from '~icons/ph/heart-bold'
  import PhFileTextBold from '~icons/ph/file-text-bold'

  export let model: Model;

  let license = "";

  model.tags.forEach((tag: string) => {
    if (tag.startsWith("license:")) {
      license = tag.substring(8).toUpperCase();
    }
  })

</script>


<a class="block card card-hover w-full flex" href="https://huggingface.co/{model.id}" target="_blank">
    <div class="flex-1 flex flex-col p-2 overflow-hidden">
        <div class="font-bold px-4 truncate text-ellipsis overflow-hidden">
            {model.id.split("/").pop()}
        </div>

        <div class="flex-1 flex px-4 truncate text-ellipsis overflow-hidden space-x-4">
            <span class="opacity-75" use:relativeTime={{date: new Date(model.lastModified)}}/> <span class="opacity-90"><PhFileTextBold class="inline"/> License: {license}</span>
        </div>
    </div>
    <div class="card variant-soft-secondary p-2 flex items-center rounded-r-none">
        <PhDownloadSimpleBold class="inline mr-2"/> {model.downloads}
    </div>
    <div class="card variant-soft-tertiary p-2 flex items-center rounded-l-none">
        <PhHeartBold class="inline mr-2 text-primary-700"/> {model.likes}
    </div>
</a>

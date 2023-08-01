import { defineStore } from 'pinia'
import { createClient } from 'contentful'
import { ref } from 'vue'

export const useBlogStore = defineStore('blogStore', () => {
      const client = createClient({
            space: 'vnpmxadttejc',
            accessToken: 'q68P-n7NxFHl-HFzWliUQ0C5YVMsmOvp6lSdJDMbCUI'
      })

      const blogData = ref([])

      async function getBlogData() {
            const response = await client.getEntries({
                  content_type: 'blogPost'
            })

            blogData.value = response.items
            // console.log(blogData.value)
      }

      return { blogData, getBlogData }
})

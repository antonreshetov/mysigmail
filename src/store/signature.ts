import { reactive } from 'vue'

export interface SignatureState {
  details: {
    name?: string
    title?: string
    // ... other details
  }
  socials: Record<string, { url: string }>
  customSocialIcons: Record<string, string>
}

export const signatureState = reactive<SignatureState>({
  details: {
    name: 'Gary Stringham',
    title: 'Software Engineer',
  },
  socials: {
    github: { url: 'https://github.com/your-profile' },
    linkedin: { url: 'https://linkedin.com/in/your-profile' },
  },
  // This is where we'll store the custom SVG code,
  // with the key being the social network name (e.g., 'github').
  customSocialIcons: {},
})

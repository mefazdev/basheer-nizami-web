// import { PortableText } from '@portabletext/react'
// import Image from 'next/image'
// import { urlFor } from '@/lib/sanity/config'

// const components = {
//   types: {
//     image: ({ value }: any) => {
//       const imageUrl = urlFor(value).width(800).height(400).url()
//       return (
//         <div className="my-8">
//           <Image
//             src={imageUrl}
//             alt={value.alt || 'Article image'}
//             width={800}
//             height={400}
//             className="rounded-lg w-full"
//           />
//           {value.caption && (
//             <p className="text-center text-sm text-gray-600 mt-2 italic">
//               {value.caption}
//             </p>
//           )}
//         </div>
//       )
//     },
//   },
//   block: {
//     h1: ({ children }: any) => (
//       <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
//     ),
//     h2: ({ children }: any) => (
//       <h2 className="text-3xl font-bold mb-5 text-gray-900 mt-8">{children}</h2>
//     ),
//     h3: ({ children }: any) => (
//       <h3 className="text-2xl font-bold mb-4 text-gray-900 mt-6">{children}</h3>
//     ),
//     h4: ({ children }: any) => (
//       <h4 className="text-xl font-bold mb-3 text-gray-900 mt-5">{children}</h4>
//     ),
//     normal: ({ children }: any) => (
//       <p className="mb-6 leading-relaxed text-gray-700 text-lg">{children}</p>
//     ),
//     blockquote: ({ children }: any) => (
//       <blockquote className="border-l-4 border-red-500 pl-6 italic my-8 text-lg text-gray-700 bg-gray-50 py-4">
//         {children}
//       </blockquote>
//     ),
//   },
//   list: {
//     bullet: ({ children }: any) => (
//       <ul className="mb-6 pl-6 space-y-2">{children}</ul>
//     ),
//     number: ({ children }: any) => (
//       <ol className="mb-6 pl-6 space-y-2 list-decimal">{children}</ol>
//     ),
//   },
//   listItem: {
//     bullet: ({ children }: any) => (
//       <li className="text-gray-700 leading-relaxed">{children}</li>
//     ),
//     number: ({ children }: any) => (
//       <li className="text-gray-700 leading-relaxed">{children}</li>
//     ),
//   },
//   marks: {
//     strong: ({ children }: any) => (
//       <strong className="font-bold text-gray-900">{children}</strong>
//     ),
//     em: ({ children }: any) => (
//       <em className="italic">{children}</em>
//     ),
//     code: ({ children }: any) => (
//       <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
//         {children}
//       </code>
//     ),
//     link: ({ children, value }: any) => (
//       <a 
//         href={value.href} 
//         className="text-red-600 hover:text-red-700 underline font-medium"
//         target={value.blank ? '_blank' : '_self'}
//         rel={value.blank ? 'noopener noreferrer' : undefined}
//       >
//         {children}
//       </a>
//     ),
//   },
// }

// interface CustomPortableTextProps {
//   content: any
// }

// export default function CustomPortableText({ content }: CustomPortableTextProps) {
//   if (!content) {
//     return <div>No content available</div>
//   }

//   return (
//     <div className="prose prose-lg max-w-none">
//       <PortableText value={content} components={components} />
//     </div>
//   )
// }


import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/config'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value).width(800).height(400).url()
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Article image'}
            width={800}
            height={400}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-600 mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-5 text-gray-900 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-4 text-gray-900 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mb-3 text-gray-900 mt-5">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-gray-700 text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-500 pl-6 italic my-8 text-lg text-gray-700 bg-gray-50 py-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 pl-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 pl-6 space-y-2 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-red-600 hover:text-red-700 underline font-medium"
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

interface CustomPortableTextProps {
  content: PortableTextBlock[]
}

export default function CustomPortableText({ content }: CustomPortableTextProps) {
  if (!content || content.length === 0) {
    return <div>No content available</div>
  }

  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}

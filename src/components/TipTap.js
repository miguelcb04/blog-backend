'use client'
// https://tiptap.dev/docs/editor/examples/default


// EJEMPLO MUY SIMPLE
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// const Tiptap = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//     ],
//     content: '<p>Hello World! 🌎️</p>',
//   })

//   return (
//     <EditorContent editor={editor} />
//   )
// }

// export default Tiptap



// EJEMPLO MÁS COMPLETO
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { useState } from 'react'


const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const [texto, setTexto] = useState(editor.getHTML())    //guardamos estado

  editor.on('update', ({ editor }) => {
    setTexto(editor.getHTML())
  })

  return (
    <>
      <input type="hidden" name='post' defaultValue={texto} style={{ backgroundColor: '#ccc'}}  />

      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </spam >
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }}
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        purple
      </spam>
      <spam style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-block', borderRadius: '6px' }} onClick={() => alert(editor.getHTML())}  >
        HTML
      </spam>
    </>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]


export default ({ contenido }) => {

  return (
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={contenido}>
    </EditorProvider>
  )
}
"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useRef } from 'react';

interface TipTapEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function TipTapEditor({ value, onChange, placeholder }: TipTapEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4],
                },
                paragraph: {
                    HTMLAttributes: {
                        class: 'mb-4',
                    },
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'w-full rounded-lg my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline',
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                editor.chain().focus().setImage({ src: data.url }).run();
                alert('Upload ảnh thành công!');
            } else {
                alert(data.error || 'Upload thất bại');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi upload ảnh');
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                {/* Headings */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${editor.isActive('heading', { level: 1 })
                        ? 'bg-primary text-primary-content'
                        : 'bg-white text-text-main hover:bg-gray-100'
                        } border border-gray-300`}
                    title="Heading 1"
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${editor.isActive('heading', { level: 2 })
                        ? 'bg-primary text-primary-content'
                        : 'bg-white text-text-main hover:bg-gray-100'
                        } border border-gray-300`}
                    title="Heading 2"
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${editor.isActive('heading', { level: 3 })
                        ? 'bg-primary text-primary-content'
                        : 'bg-white text-text-main hover:bg-gray-100'
                        } border border-gray-300`}
                    title="Heading 3"
                >
                    H3
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Text Formatting */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${editor.isActive('bold')
                        ? 'bg-primary text-primary-content'
                        : 'bg-white text-text-main hover:bg-gray-100'
                        } border border-gray-300`}
                    title="Bold"
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${editor.isActive('italic')
                        ? 'bg-primary text-primary-content'
                        : 'bg-white text-text-main hover:bg-gray-100'
                        } border border-gray-300`}
                    title="Italic"
                >
                    <em>I</em>
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded transition-colors ${editor.isActive('bulletList')
                        ? 'bg-primary text-primary-content'
                        : 'bg-white text-text-main hover:bg-gray-100'
                        } border border-gray-300`}
                    title="Bullet List"
                >
                    <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded transition-colors ${editor.isActive('orderedList')
                        ? 'bg-primary text-primary-content'
                        : 'bg-white text-text-main hover:bg-gray-100'
                        } border border-gray-300`}
                    title="Numbered List"
                >
                    <span className="material-symbols-outlined text-lg">format_list_numbered</span>
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Image Upload */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-white text-text-main border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    title="Chèn ảnh"
                >
                    <span className="material-symbols-outlined text-lg">image</span>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Clear Formatting */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-white text-text-main border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    title="Xóa định dạng"
                >
                    <span className="material-symbols-outlined text-lg">format_clear</span>
                </button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />

            {/* Info */}
            <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-text-sub">
                💡 Tip: Paste HTML sẽ tự động giữ nguyên định dạng. Nhấn Enter để tạo đoạn mới.
            </div>
        </div>
    );
}

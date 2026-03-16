import { useState } from "react";
import { CrossIcon } from "../icons/crossicon";
import { Button } from "./button";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; link: string }) => void;
}

export const CreateModal = ({ isOpen, onClose, onSubmit }: CreateModalProps) => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        // Validation
        if (!title.trim()) {
            setError("Title is required");
            return;
        }
        if (!link.trim()) {
            setError("Link is required");
            return;
        }

        // Clear error and submit
        setError("");
        onSubmit({ title: title.trim(), link: link.trim() })

        setTitle("");
        setLink("");
        onClose();
    };

    const handleClose = () => {
        setTitle("");
        setLink("");
        setError("");
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={handleClose}
        >
            {/* Modal */}
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Content</h2>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                    >
                        <CrossIcon />
                    </button>
                </div>

                <div className="p-4 space-y-4">

                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Link Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link
                        </label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Content Type Selection (Optional) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content Type
                        </label>
                        <div className="flex gap-2">
                            <TypeButton label="Twitter" active={link.includes("twitter") || link.includes("x.com")} />
                            <TypeButton label="YouTube" active={link.includes("youtube")} />
                            <TypeButton label="Article" active={!link.includes("twitter") && !link.includes("youtube") && !link.includes("x.com")} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
                    <Button
                        varient="primary"
                        size="md"
                        text="Add Content"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

// Helper component for content type buttons
const TypeButton = ({ label, active }: { label: string; active: boolean }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      active
        ? "bg-purple-100 text-purple-700"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {label}
  </span>
);

"use client";
import { CardProps } from "@/utils/types";
import { Star } from "lucide-react";
import React from "react";

export default function Card({ review, onEdit, onDelete }: CardProps) {
  return (
    <div className="bg-background rounded-lg shadow-md p-6 transition-all hover:shadow-lg border border-muted">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {review.title}
          </h3>
          <p className="text-sm text-muted-foreground">by {review.author}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star
            className={`w-5 h-5 ${
              review.rating >= 4 ? "text-primary" : "text-muted"
            }`}
            fill="currentColor"
          />
          <span className="text-sm font-medium text-muted-foreground">
            {review.rating}/5
          </span>
        </div>
      </div>

      <p className="text-foreground/80 mb-4 line-clamp-3">{review.content}</p>

      <div className="flex justify-between items-center pt-4 border-t border-muted">
        <span className="text-sm text-muted-foreground">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(review)}
              className="px-3 py-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(review.id)}
              className="px-3 py-1 text-sm text-secondary hover:text-secondary/80 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

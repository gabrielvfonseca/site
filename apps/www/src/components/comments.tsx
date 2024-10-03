"use client"; // This is a client-only component

import { FormEvent, useMemo } from "react";

// Next
import { useSearchParams } from "next/navigation";

import {
    Composer,
    Comment,
    CommentBodyLinkProps,
    CommentBodyMentionProps,
    ComposerEditorMentionSuggestionsProps,
    ComposerSubmitComment,
} from "@liveblocks/react-ui/primitives";
import { useCreateThread, useUser, RoomProvider, useThreads } from "@liveblocks/react/suspense";

// Client Side Suspense from Liveblocks
import { ClientSideSuspense } from "@liveblocks/react";

// ErrorBoundary is a component that catches errors in its children and displays a fallback UI.
import { ErrorBoundary } from "react-error-boundary";

// Skeleton is a component that displays a loading skeleton.
import { Skeleton } from "@components/ui/skeleton";

// Custom classnames utility
import { cn } from "@utils/cn";

// Button component from the UI
import { Button } from "@components/ui/button";

// Motion components from Framer Motion
import { AnimatePresence, motion } from "framer-motion";
import { inputVariants } from "./ui/input";

// Types
interface CommentsProps {
    roomId: string;
    auth: boolean;
    className?: string;
};

interface ThreadListProps {
    enableComposer: boolean;
};

function MyComposer () {
    const createThread = useCreateThread();
  
    function handleComposerSubmit(
      { body, attachments }: ComposerSubmitComment,
      event: FormEvent<HTMLFormElement>
    ) {
      event.preventDefault();
  
      // Create a new thread
      const thread = createThread({
        body,
        attachments,
        metadata: {},
      });
    }
  
    return (
        <Composer.Form 
            onComposerSubmit={handleComposerSubmit}
            className="space-y-4"
        >
            <Composer.Editor
                components={{
                    Mention,
                    MentionSuggestions,
                    Link,
                }}
                placeholder="Write a comment..."
                className={cn(inputVariants, "text-xs")}
            />
            <Composer.Submit asChild>
                <Button variant="outline" type="submit">Post</Button>
            </Composer.Submit>
        </Composer.Form>
    );
}


// Render a mention in the composer's editor, e.g. "@Emil Joyce"
function Mention({ userId }: CommentBodyMentionProps) {
    return (
        <Comment.Mention className="bg-black">
            @{userId}
        </Comment.Mention>
    );
  }
  
  // Render a list of mention suggestions, used after typing "@" in the editor
  function MentionSuggestions({
    userIds,
    selectedUserId,
  }: ComposerEditorMentionSuggestionsProps) {
    return (
      <Composer.Suggestions className="px-2 py-1 border rounded-lg shadow-sm border-gray-400 dark:border-gray-1000 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-sm">
        <Composer.SuggestionsList className="h-fit">
          {userIds.map((userId) => (
            <MentionSuggestion key={userId} userId={userId} />
          ))}
        </Composer.SuggestionsList>
      </Composer.Suggestions>
    );
  }
  
  // Render a single mention suggestion from a `userId`
  function MentionSuggestion({ userId }: { userId: string }) {
    const { user } = useUser(userId);
  
    return (
        <li
            value={user.name || ''}
            className="flex h-fit items-center gap-2"
        >
            <img className="size-6 rounded-full" src={user.avatar} alt={user.name} />
            <p className="text-xs">{user.name}</p>
        </li>
    );
  }
  
  // Render a link in the composer's editor, e.g. "https://liveblocks.io"
  function Link({ href, children }: CommentBodyLinkProps) {
    return <Comment.Link href={href}>{children}</Comment.Link>;
  }




/**
 * Displays a list of threads, along with a composer for creating
 * new threads.
 */
function ThreadList({ enableComposer }: ThreadListProps) {
    // Get the threads from the room
    const { threads } = useThreads();

    // Render the threads and composer
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"    
        >
            <AnimatePresence>
                {threads.map((thread, index: number) => (
                    <motion.div 
                        key={thread.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-4"
                        transition={{ 
                            duration: 0.2, 
                            delay: 0.1 * index,
                            ease: "easeInOut" 
                        }}
                    >
                        {
                            thread.id
                        }
                        
                    </motion.div>
                ))}
            </AnimatePresence>


                    <MyComposer />
                
        </motion.div>
    );
};

export default function Comments ({ roomId, auth, className }: CommentsProps) {
    // The room ID is used to identify the room where the threads are stored.
    const id = useRoomId(`liveblocks:notes:${roomId}`);

    // Render the comments component
    return (
        <RoomProvider id={id}>
            <div className={cn("flex flex-col justify-center w-full", className)}>
                <ErrorBoundary
                    fallback={
                        <p>There was an error while getting comments. Please try again later.</p>
                    }
                >
                    <ClientSideSuspense fallback={ <Skeleton /> }>
                        <ThreadList enableComposer={auth} />
                    </ClientSideSuspense>
                </ErrorBoundary>
            </div>
        </RoomProvider>
    );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params?.get("exampleId");

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [roomId, exampleId]);

  return exampleRoomId;
}
import { useEffect, useState } from "react";


export const useChatScroll = ({
    chatRef, bottomRef, shouldLoadMore, count, loadMore
}) => {
    const [hasInitialized, setHasInitialized] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = chatRef?.current?.scrollTop;
            if (scrollTop == 0 && shouldLoadMore) {
                loadMore();
            }
        }
        chatRef.current?.addEventListener('scroll', handleScroll);
        return () => {
            chatRef.current?.removeEventListener('scroll', handleScroll);
        }
    }, [shouldLoadMore, loadMore, chatRef]);
    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef?.current;
        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }
            if (!topDiv) {
                return false;
            }

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <= 100;


        }
        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomDiv?.scrollIntoView({
                    behavior: 'smooth',
                });
            }, 100);
        }
        
    }, [bottomRef, chatRef, count, hasInitialized])
}
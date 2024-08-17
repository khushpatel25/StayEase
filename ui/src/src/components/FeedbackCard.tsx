//@author Khush Patel

import {User} from '@src/lib/dto';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';
import {StarIcon} from 'lucide-react';
import {formatDistanceToNow} from 'date-fns';

export type feedback = {
  user: User['payload'];
  id: number;
  content: string;
  rating: string;
  createdAt: number[];
};

export type feedbackCardProps = {
  feedback: feedback;
  key: number;
};

const FeedbackCard = ({feedback}: feedbackCardProps) => {
  console.log({feedback});

  const givenRating = Number(feedback.rating);
  const remainingRating = 5 - givenRating;
  console.log({remainingRating});

  const createdAtDate = new Date(
    feedback.createdAt[0],
    feedback.createdAt[1] - 1,
    feedback.createdAt[2],
    feedback.createdAt[3],
    feedback.createdAt[4],
    feedback.createdAt[5],
    feedback.createdAt[6],
  );
  const timeAgo = formatDistanceToNow(createdAtDate);
  console.log({timeAgo});

  return (
    <div>
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={feedback.user.userAvatar} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <div className="font-medium">{feedback.user.fullName}</div>
            <div className="text-xs text-muted-foreground">{timeAgo} ago</div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(givenRating)].map((_, index) => (
              <StarIcon key={index} className="w-5 h-5 fill-primary" />
            ))}
            {[...Array(remainingRating)].map((_, index) => (
              <StarIcon
                key={givenRating + index}
                className="w-5 h-5 fill-muted stroke-muted-foreground"
              />
            ))}
          </div>
          <div className="text-sm ">{feedback.content}</div>
        </div>
      </div>
      <Separator className="my-5" />
    </div>
  );
};

export default FeedbackCard;

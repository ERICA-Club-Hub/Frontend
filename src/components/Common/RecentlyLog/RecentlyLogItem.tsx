import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface RecentlyLogItemProps {
    clubId: number;
    imgUrl: string;
    clubLogoImgUrl: string;
    clubName: string;
}

export default function RecentlyLogItem({
    clubId,
    imgUrl,
    clubLogoImgUrl,
    clubName,
}: RecentlyLogItemProps) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/club/${clubId}`)}
            className="w-[155px] h-[155px] rounded-[10px] relative"
        >
            <img
                src={imgUrl}
                className="absolute w-[155px] h-[155px] rounded-[10px]"
            />
            <div className="absolute bottom-[10px] left-[10px] flex gap-[5px] items-center">
                <img
                    src={clubLogoImgUrl}
                    className="w-[20px] h-[20px] rounded-[1.33px]"
                />
                <span className="font-medium text-small text-white">
                    {clubName}
                </span>
            </div>
        </div>
    );
}

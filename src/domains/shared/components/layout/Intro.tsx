import ActivityGuide from '@/domains/club/introduction/ui/public/ActivityGuide';
import AnnualSchedule from '@/domains/club/schedule/ui/public/AnnualSchedule';
import BaseInfo from '@/domains/club/introduction/ui/public/BaseInfo';
import ClubIntroduce from '@/domains/club/introduction/ui/public/ClubIntroduce';

export default function Intro() {
    return (
        <section className="flex flex-col gap-[10px]">
            <BaseInfo />
            <AnnualSchedule />
            <ClubIntroduce />
            <ActivityGuide />
        </section>
    );
}

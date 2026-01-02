import ActivityGuide from './ActivityGuide';
import AnnualSchedule from './AnnualSchedule';
import BaseInfo from './BaseInfo';
import ClubIntroduce from './ClubIntroduce';

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

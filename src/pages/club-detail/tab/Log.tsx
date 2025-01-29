import styled from 'styled-components';
import test1 from '../../../assets/common/sns.svg';
import test2 from '../../../assets/common/sns.svg';
import test3 from '../../../assets/common/sns.svg';
import test4 from '../../../assets/common/sns.svg';
import test5 from '../../../assets/common/sns.svg';
import test6 from '../../../assets/common/sns.svg';
import test7 from '../../../assets/common/sns.svg';
import test8 from '../../../assets/common/sns.svg';
import test9 from '../../../assets/common/sns.svg';
import test10 from '../../../assets/common/sns.svg';
import test11 from '../../../assets/common/sns.svg';
import { useState } from 'react';
import { ActivityLogModal } from '../ActivityLogModal';

interface Image {
    id: string;
    url: string;
}

interface LogProps {
    clubId: string;
}

const images: Image[] = [
    { id: 'test1', url: test1 },
    { id: 'test2', url: test2 },
    { id: 'test3', url: test3 },
    { id: 'test4', url: test4 },
    { id: 'test5', url: test5 },
    { id: 'test6', url: test6 },
    { id: 'test7', url: test7 },
    { id: 'test8', url: test8 },
    { id: 'test9', url: test9 },
    { id: 'test10', url: test10 },
    { id: 'test11', url: test11 },
];

export default function Log({ clubId }: LogProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const handlClickImg = () => {
        setModalOpen(true);
    };
    console.log('활동로그에서', clubId);
    return (
        <Container>
            <LogGrid>
                {images.map((image) => (
                    <LogImg
                        onClick={handlClickImg}
                        key={image.id}
                        src={image.url}
                        alt={image.id}
                    ></LogImg>
                ))}
            </LogGrid>
            {modalOpen && (
                <ActivityLogModal
                    setModalOpen={setModalOpen}
                ></ActivityLogModal>
            )}
        </Container>
    );
}
const LogGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
`;
const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
    margin-bottom: 7px;
`;
const LogImg = styled.img`
    width: 95px;
    height: 95px;
    border-radius: 5px;
`;

import AlphaTab from './AlphaTab/AlphaTab';
import './Home.css';


export default function Home() {
    return(
        <div className='home-wrapper'>
            <h3>Malde Tab Viewer</h3>
            <AlphaTab />
        </div>
    )
}
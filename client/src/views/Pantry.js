import react from 'React'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import PantryCard from "../components/PantryCard"

function Pantry() {
    return (
        <div>
            <Navbar />
            <Header />
            <PantryCard
                name=""
                image=""
                description=""
                weight=""
            />
        </div>
    )
}

export default Pantry;

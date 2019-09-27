import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import { async } from 'q';
import Result from "./result";
import ThemeContext from "./themecontext";
const searchparam = () => {
    const [location, setlocation] = useState("Seatle,WA");
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
    const [pets, setpets] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);
    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });

        console.log("animals", animals);

        setpets(animals || []);
    }
    useEffect(() => {
        setBreeds([]);
        setBreed("");
        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal], setBreed, setBreeds);


    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location"> Location
                <input id="location " value={location} placeholder="Location"
                        onChange={e => setlocation(e.target.value)} />
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <label htmlFor="location">
                    Theme
  <select
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                        onBlur={e => setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>;
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Result pets={pets} />
        </div>
    )
}
export default searchparam;
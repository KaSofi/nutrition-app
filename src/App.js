import { useState } from "react";
import { useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import { Button } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Ingredients } from "./Ingredients";

function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const endpoint = 'https://api.edamam.com/api/nutrition-details?app_id=c3255b19&app_key=ac64b8f0ca4dfe1d00b2d897639454c8'

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

  return (
    <div className="NutritionContainer">

      {stateLoader && <LoaderPage />}
      <h1>NITRITION ANALYSIS</h1>
      <h4>Enter an ingredient list for what you are cooking, like <span>"1 cup rice, 10 oz chickpeas"</span>, etc.
          Enter each ingredient on a new line.</h4>
      <form className="FormPosition" onSubmit={finalSearch}>
        <textarea cols="80" rows="10"
          placeholder="1 cup rice, 10 oz chickpeas"
          onChange={(e) => setMySearch(e.target.value)}
        />
        <Button variant="contained" type="submit">Search</Button>
      </form>
      <div>
      <div className="CaloriesBlock">

          {
            myNutrition && myNutrition.ingredients
            .map(( el, index ) => 
            <div key={index} >
            <Ingredients
                        food={el.parsed[0].food}
                        measure={el.parsed[0].measure}
                        quantity={el.parsed[0].quantity}
                        weight={el.parsed[0].weight}
                        myNutrition={el.parsed[0].myNutrition}
                />
            </div>
            )
          }
      </div>

        {
          myNutrition && Object.values(myNutrition.totalNutrients)
          
            .map(({ label, quantity, unit }, index) =>
            <div key={index}>
                <Nutrition
                  label={label}
                  quantity={quantity.toFixed()}
                  unit={unit}
                />
            </div>
            )
        }

      </div>
    </div>
  );
}

export default App;

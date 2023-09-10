export const Ingredients = ({ food, measure, quantity, weight, unit }) => {

    return (
        <div>
            <table className="IngredientsTable" border="1" cellPadding="20" bgcolor="#f0f0f0">
                <caption>Nutrition Analaysis</caption>
                <thead>
                    <tr>
                        <th>Qty</th>
                        <th>Food</th>
                        <th>Unit</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{quantity}</td>
                        <td>{measure}</td>
                        <td>{food}</td>
                        <td>{weight} {unit}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export const Nutrition = ({ label, quantity, unit}) => {


    return (
        <div className="NutritionStyle">
            <table className="NutritionTable" cellPadding="10" width="100%"  frame="hsides">
                <tbody>
                    <tr>
                        <td className="NutritionLabelPosition">{label}</td>
                        <td className="NutritionQuantityPosition">{quantity} {unit}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

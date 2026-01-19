import AddTransactionButton from "../FinancialActions/AddExpenseButton";
import FilterTab from "../FinancialFilters/FilterTab";

export default function FinancialHeader(){
    return(
        <div className="flex place-items-center justify-around  mt-10 gap-220" >
            <FilterTab />
            <AddTransactionButton />
        </div>
    )
}
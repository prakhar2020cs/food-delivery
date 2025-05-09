import DashboardHeader from './DashboardHeader';



export default function layout({children}){
return(
<div className="user-dashboard">
<DashboardHeader />
<main>
    {children}
</main>
</div>
)


}
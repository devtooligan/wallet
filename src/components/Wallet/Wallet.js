import "./Wallet.scss"

import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";
import Deposit from "./Deposit/Deposit"
import Transfer from "./Transfer/Transfer"
<<<<<<< HEAD
import Security from "./Security/Security";
=======
import Collectable from "./Collectable/Collectable";
>>>>>>> d4cc8490b51fb1e12a77afbd12ceade729426762

export default function Wallet(props) {
  return (
    <div id="wallet">
      <TopBar {...props} />
      <SideBar match={props.match} portfolio={props.portfolio}/>
      <div id="wallet-container">
        <Switch>
          <Route path={props.match.url + "/dashboard"}>
            <Dashboard portfolio={props.portfolio} allNetworks={props.allNetworks} setNetwork={props.setNetwork} />
          </Route>
          <Route path={props.match.url + "/deposit"}>
            <Deposit selectedAcc={props.selectedAcc} allNetworks={props.allNetworks} selectedNetwork={props.network.id} />
          </Route>
          <Route path={props.match.url + "/transfer"}>
            <Transfer portfolio={props.portfolio} selectedAcc={props.selectedAcc} accounts={props.accounts}/>
          </Route>
          <Route path={props.match.url + "/security"}>
            <Security selectedAcc={props.selectedAcc} selectedNetwork={props.network.id} accounts={props.accounts}/>
          </Route>
          <Route path={props.match.url + "/transactions"}></Route>
          <Route path={props.match.url + "/swap"}></Route>
          <Route path={props.match.url + "/earn"}></Route>
          <Route path={props.match.url + "/nft/:network/:collectionAddr/:tokenId"}>
            <Collectable allNetworks={props.allNetworks}/>
          </Route>

          <Route path={props.match.url + "/"}>
            <Redirect to={props.match.url + "/dashboard"} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

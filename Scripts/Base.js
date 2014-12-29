
var Money = 0;
var Respect = 0;
var MoneyRate = 1;

var WeaponsInventory = [0, 0, 0];
var WeaponsName      = ['Knife', 'Gun', 'Uzi'];
var WeaponsCost      = [20, 100, 200];
var WeaponsBonus     = [0.5, 2, 5];
var WeaponsCostRate = 1.15;
var WeaponsCap = [5, 3, 2];

var EmployeesInventory = [0, 0, 0];
var EmployeesName = ['Rookie', 'Veteran', 'Expert'];
var EmployeesCost = [1000, 1500, 2500];
var EmployeesStealRate = [0.5, 0.7, 1.0];
var EmployeesRespectBonus = [10, 15, 30];
var EmployeesLimitQuantity = [3, 3, 1];
var EmployeesCostRate = 1.25;
var EmployeesStealRateBonus = 0;
var EmployeeCap = [4, 2, 2];

var OrgInventory = [0, 0, 0, 0, 0];
var OrgNames = ['Arsenal', 'Base', 'Building', 'Car', 'Blinded Truck'];
var OrgCost = [10000, 15000, 150000, 9500, 450000];
var OrgBonus = ['Raises Weapons Cap', 'Raises Employee Cap', 'Raises more the employee cap', 'You gain access to a new and better shop', 'Your employees steal faster'];
var OrgBonusRate = [3, 1, 2, 0, 2];
var OrgBonusType = ['WeaponsCap', 'EmployeeCap', 'EmployeeCap', 'NewShop', 'EmployeesStealRate'];
var OrgCap = [2, 2, 1, 1, 2];
var OrgCostRate = 1.4;

var OrgTabEnabled = false;
var ShopTabEnabled = false;
var EmployeeTabEnabled = false;
var BaseTabEnabled = false;

var ExpireCookie = "; Expires = Thu, 31th Dec 2099 12:00:00 utc;";
var DeleteCookie = "Expires=Thu, 01 Jan 1970 00:00:00 UTC;";

function SaveGame()
{
    document.cookie = "Money=" + Money + ExpireCookie;
    document.cookie = "Respect=" + Respect + ExpireCookie;
    document.cookie = "MoneyRate=" + MoneyRate + ExpireCookie;
    document.cookie = "WeaponsInventory=" + WeaponsInventory + ExpireCookie;
    document.cookie = "EmployeesInventory=" + EmployeesInventory + ExpireCookie;
    document.cookie = "OrgInventory=" + OrgInventory + ExpireCookie;
    document.cookie = "OrgTabEnabled=" + OrgTabEnabled + ExpireCookie;
    document.cookie = "ShopTabEnabled=" + ShopTabEnabled + ExpireCookie;
    document.cookie = "EmployeeTabEnabled=" + EmployeeTabEnabled + ExpireCookie;
    document.cookie = "BaseTabEnabled=" + BaseTabEnabled + ExpireCookie;
}
function LoadGame()
{
    var cookie = document.cookie.split(";");

    for (var i = 0; i < cookie.length; i++)
    {
        var subCookie = cookie[i].split("=");
        alert(subCookie[1]);
        switch(subCookie[0])
        {
            case ("Money"):
                Money = subCookie[1];
                break;
            case ("Respect"):
                Respect = subCookie[1];
                break;
        }
    }

    Refresh();
}
function DeleteGame()
{
    document.cookie = "Money=;" + DeleteCookie;
    document.cookie = "Respect=;" + DeleteCookie;
    document.cookie = "MoneyRate=;" + DeleteCookie;
    document.cookie = "WeaponsInventory=;" + DeleteCookie;
    document.cookie = "EmployeesInventory=;" + DeleteCookie;
    document.cookie = "OrgInventory=;" + DeleteCookie;
    document.cookie = "OrgTabEnabled=;" + DeleteCookie;
    document.cookie = "ShopTabEnabled=;" + DeleteCookie;
    document.cookie = "EmployeeTabEnabled=;" + DeleteCookie;
    document.cookie = "BaseTabEnabled=;" + DeleteCookie;
}
function CreateStealMoneyBtn()
{
    var btn = document.createElement('button');
    btn.setAttribute('onclick', 'GetMoney()');
    var t = document.createTextNode("Steal Money");
    btn.appendChild(t);

    document.getElementById('StealMoneyButton').appendChild(btn);
}
function OnLoad() 
{
    setInterval(Refresh, 500);

    CreateStealMoneyBtn();

    HideTab('Shop');
    HideTab('Employees');
    HideTab('Organization');
    HideTab('Base');

    SetMessage('MainMje', 'You are a low-level thief, cant really steal from others than homeless and old people.');
    SetMessage('MainSubMje', 'Do you really wanna steal from those poor people?');
    SetMessage('currentRespect', '<br />');
    SetMessage('MoneyPerSec', '<br />');
}
function BuyWeapon(id)
{
    if (parseInt(Money) >= parseInt(WeaponsCost[id]) && parseInt(WeaponsInventory[id]) < parseInt(WeaponsCap[id]))
    {
        Money = parseInt(Money) - parseInt(WeaponsCost[id]);
        WeaponsInventory[id]++;
        MoneyRate += WeaponsBonus[id];
        WeaponsCost[id] = (parseInt(WeaponsCost[id]) * WeaponsCostRate).toFixed(2);
        Refresh();

        if (WeaponsName[id] == 'Uzi' && !EmployeeTabEnabled)
        {
            SetMessage('ShopMje', 'Wow, you got a big weapon right there.');
            SetMessage('ShopSubMje', 'Maybe you should consider hiring people to do the dirty job for you.');
            ShowTab('Employees');

            SetMessage('EmployeesMje', 'Employees steal for you at a fixed rate over time, depending on your steal rate.');
            SetMessage('EmployeesSubMje', 'The more employees you have, the more powerful you get.');
            EmployeeTabEnabled = true;
            
        }
    }
}
function HireEmployee(id)
{
    if (Money >= EmployeesCost[id] && EmployeesInventory[id] < EmployeeCap[id])
    {
        Money -= EmployeesCost[id];
        EmployeesCost[id] *= EmployeesCostRate;
        EmployeesInventory[id]++;
        EmployeesStealRateBonus += EmployeesStealRate[id];
        Respect += EmployeesRespectBonus[id];
        EmployeesStealRate[id] /= EmployeesCostRate;

        Refresh();

        if (Respect >= 50 && !OrgTabEnabled)
        {
            alert('Congratulations! You have founded your own Crime Organization!');
            ShowTab('Organization');

            SetMessage('OrganizationMje', 'This is your own organization, where stuff happens.');
            SetMessage('OrganizationSubMje', 'But be careful, you can get arrested now.');

            SetMessage('MainMje', 'You dont really have a need to steal on your own now.');
            SetMessage('MainSubMje', 'Do you?');

            SetMessage('ShopMje', 'Buy stuff for your employees.');
            SetMessage('ShopSubMje', 'The better weapons they have, the more money you get.');

            OrgTabEnabled = true;
        }
    }
}
function RefreshWeaponsTable()
{
    var table = document.getElementById('WeaponsTable');

    if (table.rows.length > 0)
    {
        var i = table.rows.length -1;

        while (i > 0)
        {
            table.deleteRow(i);
            i--;
        }
    }

    for (var i = 0; i < WeaponsName.length; i++)
    {
        var row = table.insertRow(table.rows.length);

        var cell = row.insertCell(0);
        cell.innerHTML = WeaponsName[i];

        var cell1 = row.insertCell(1);
        cell1.innerHTML = '$' + WeaponsCost[i];

        var cell2 = row.insertCell(2);
        cell2.innerHTML = 'Steal Money +$' + WeaponsBonus[i];

        var cell3 = row.insertCell(3);
        var btn = document.createElement('button');
        btn.setAttribute('onclick', 'BuyWeapon(' + i + ')');
        var t = document.createTextNode("Buy");
        btn.appendChild(t);
        cell3.appendChild(btn);

        var cell4 = row.insertCell(4);
        cell4.innerHTML = WeaponsInventory[i] + '/' + WeaponsCap[i];
    }
}
function RefreshEmployeesTable()
{
    var table = document.getElementById('EmployeesTable');

    if (table.rows.length > 0) {
        var i = table.rows.length - 1;
        while (i > 0) {
            table.deleteRow(i);
            i--;
        }
    }

    for (var i = 0; i < EmployeesName.length; i++)
    {
        
        var row = table.insertRow(table.rows.length);

        var cell = row.insertCell(0);
        cell.innerHTML = EmployeesName[i];

        var cell1 = row.insertCell(1);
        cell1.innerHTML = EmployeesCost[i].toFixed(2);

        var cell2 = row.insertCell(2);
        cell2.innerHTML = 'Steal Money *' + EmployeesStealRate[i].toFixed(2);

        var cell2 = row.insertCell(3);
        cell2.innerHTML = '+' + EmployeesRespectBonus[i];

        var cell4 = row.insertCell(4);
        var btn = document.createElement('Button');
        btn.setAttribute('onclick', 'HireEmployee(' + i + ')');
        var t = document.createTextNode("Hire");
        btn.appendChild(t);
        cell4.appendChild(btn);

        var cell5 = row.insertCell(5);
        cell5.innerHTML = EmployeesInventory[i] + '/' + EmployeeCap[i];
    }
}
function RefreshOrganizationTable()
{
    var table = document.getElementById('OrganizationTable');

    if (table.rows.length > 0) {
        var i = table.rows.length - 1;

        while (i > 0) {
            table.deleteRow(i);
            i--;
        }
    }

    for (var i = 0; i < OrgNames.length; i++) {

        var row = table.insertRow(table.rows.length);

        var cell = row.insertCell(0);
        cell.innerHTML = OrgNames[i];

        var cell1 = row.insertCell(1);
        cell1.innerHTML = '$' + OrgCost[i];

        var cell2 = row.insertCell(2);
        cell2.innerHTML = OrgBonus[i] + ' +' + OrgBonusRate[i];

        var cell3 = row.insertCell(3);
        var btn = document.createElement('Button');
        btn.setAttribute('onclick', 'BuyOrgItem(' + i + ')');
        var t = document.createTextNode("Buy");
        btn.appendChild(t);
        cell3.appendChild(btn);

        var cell4 = row.insertCell(4);
        cell4.innerHTML = OrgInventory[i] + '/' + OrgCap[i];
    }
}
function BuyOrgItem(id)
{
    if (parseInt(Money) >= parseInt(OrgCost[id]) && parseInt(OrgInventory[id]) < parseInt(OrgCap[id]))
    {
        Money = parseInt(Money) - parseInt(OrgCost[id]);
        OrgInventory[id]++;

        switch(OrgBonusType[id])
        {
            case 'WeaponsCap':
                
                for (var i = 0; i < WeaponsCap.length; i++)
                {
                    WeaponsCap[i] += OrgBonusRate[id];
                }
            break;
            case 'EmployeeCap':
                for (var i = 0; i < EmployeeCap.length; i++)
                {
                    EmployeeCap[i] += OrgBonusRate[id];
                }
            break;
            case 'NewShop':
                //TODO NEW SHOP
            break;
            case 'EmployeesStealRate':
                var cont = 0;
                for (var i = 0; i < EmployeesInventory; i++)
                {
                    cont += EmployeesInventory[i];
                }

            break;
        }

        if (OrgNames[id] == 'Base' && !BaseTabEnabled)
        {
            alert('Congratulations, you now have a brand new base!');
            ShowTab('Base');
            BaseTabEnabled = true;
        }
        
    }
}
function GetMoney()
{
    Money += MoneyRate;

    Refresh();

    if (parseInt(Money) >= 10 && !ShopTabEnabled)
    {
        SetMessage('MainMje', 'Boy, you are really stealing from them.');
        SetMessage('MainSubMje', '<br /> <br /> ');
    }

    if (parseInt(Money) >= 15 && !ShopTabEnabled)
    {
        SetMessage('MainMje', 'While you were stealing, you discovered an underground old shop.');
        SetMessage('MainSubMje', 'Go check it out.');
        ShowTab('Shop');
        ShopTabEnabled = true;
    }
}
function Refresh()
{
    Money += (MoneyRate * EmployeesStealRateBonus) / 2;

    var div = document.getElementById('currentMoney');
    div.innerHTML = 'Current Money: $' + Money.toFixed(2);

    var div = document.getElementById('currentMoneyRate');
    div.innerHTML = 'Money Steal Rate: $' + MoneyRate.toFixed(2) + ' per steal.';

    if (EmployeeTabEnabled)
    {
        var div = document.getElementById('MoneyPerSec');
        div.innerHTML = 'Money per second: $' + (MoneyRate * EmployeesStealRateBonus).toFixed(3);

        var div = document.getElementById('currentRespect');
        div.innerHTML = 'Respect: ' + Respect;
    }

    RefreshWeaponsTable();
    RefreshEmployeesTable();
    RefreshOrganizationTable();
}
function SetMessage(id, mje)
{
    var mj1 = document.getElementById(id);
    mj1.innerHTML = mje;
}
function HideTab(id)
{
    var div = document.getElementById(id);
    div.style.display = 'none';
}
function ShowTab(id)
{
    var div = document.getElementById(id);
    div.style.display = 'block';
}

import {screen,render} from "@testing-library/react"
import Register from '../../Register/Register'


describe("Register Test Cases",()=>
{
    test("two buttons test",async ()=>{
        render(<Register/>)
        const buttonlist=await screen.findAllByRole("button")
        expect(buttonlist).toHaveLength(2)

    })
})
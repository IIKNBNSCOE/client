import App from './App'
import {render,screen} from "@testing-library/react"
import '@testing-library/jest-dom'
describe("Test Demo",()=>
{
    test("testing home page",()=>
    {
        render(<App/>)
        const element=screen.getByTestId("demo")
        expect(element).toBeInTheDocument()
    })
})
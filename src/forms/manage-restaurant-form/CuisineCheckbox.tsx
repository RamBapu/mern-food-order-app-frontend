import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { FormControl, FormItem, FormLabel } from "../../components/ui/form"
import { Checkbox } from "../../components/ui/checkbox"

type Props = {
  cuisine: string
  field: ControllerRenderProps<FieldValues, "cuisines">
}

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  const cuisines = field.value
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={cuisines.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...cuisines, cuisine])
            } else {
              field.onChange(
                cuisines.filter((value: string) => value !== cuisine)
              )
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  )
}

export default CuisineCheckbox

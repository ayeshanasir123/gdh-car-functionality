import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

interface SearchResultsFilterProps {
  defaultValue: string;
  filterName: string;
  filterFormSchema: any;
  filterForm: any;
  filterList: any;
}

const SearchResultsFilter = ({
  defaultValue,
  filterName,
  filterFormSchema,
  filterForm,
  filterList,
}: SearchResultsFilterProps) => {
  function onFilterFormSubmit(data: z.infer<typeof filterFormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Accordion type="single" defaultValue={defaultValue} collapsible>
      <AccordionItem value={defaultValue}>
        <AccordionTrigger>{filterName}</AccordionTrigger>
        <AccordionContent>
          <Form {...filterForm}>
            <form
              onSubmit={filterForm.handleSubmit(onFilterFormSubmit)}
              className="space-y-8"
            >
              <FormField
                control={filterForm.control}
                name={defaultValue}
                render={() => (
                  <FormItem>
                    {filterList.map(
                      (item: { id: string; label: string; price?: number }) => (
                        <FormField
                          key={item.id}
                          control={filterForm.control}
                          name={defaultValue}
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value: string) =>
                                                value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                                {!!item?.price && (
                                  <FormDescription>
                                    ${item.price}
                                  </FormDescription>
                                )}
                              </FormItem>
                            );
                          }}
                        />
                      )
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SearchResultsFilter;

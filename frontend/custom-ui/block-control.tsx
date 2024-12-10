import * as React from "react";

import { useBase, useRecords } from "@airtable/blocks/ui";
import { withJsonFormsControlProps } from "@jsonforms/react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid2";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { Block } from "../automations/types";

interface BlockControlProps {
  data: Block[];
  handleChange(path: string, value: any): void;
  path: string;
  schema: any;
}

function BlockControl({ data, handleChange, path, schema }: BlockControlProps) {
  const base = useBase();
  const blocks = [...(data || [])];

  const blockTable = base.tables.find((t) => t.name === "Blocks");
  const blockField = blockTable.fields.find((f) => f.name === "Block");
  const getAllowedBlocks = (block: Block) =>
    blockField.config.options.choices.filter((choice) =>
      (schema.items.properties?.name?.enum ?? []).includes(choice.name)
    );
  const attributeField = blockTable.fields.find((f) => f.name === "Attribute");
  const getAllowedAttribute = (block: Block) =>
    attributeField.config.options.choices
      .filter((choice) =>
        blockRecords
          .filter((record) => record.getCellValue("Block").name === block.name)
          .map((record) => record.getCellValue("Attribute").name)
          .includes(choice.name)
      )
      .filter((choice) =>
        (schema.items.properties?.attribute?.enum ?? []).includes(choice.name)
      );
  const categoryField = blockTable.fields.find((f) => f.name === "Category");
  const getAllowedCategory = (block: Block) =>
    categoryField.config.options.choices
      .filter((choice) =>
        blockRecords
          .filter(
            (record) =>
              record.getCellValue("Block").name === block.name &&
              record.getCellValue("Attribute").name === block.attribute
          )
          .map((record) => record.getCellValue("Category").name)
          .includes(choice.name)
      )
      .filter((choice) =>
        (schema.items.properties?.category?.enum ?? []).includes(choice.name)
      )
      .filter(
        (choice) =>
          !Boolean(
            blocks
              .map((block) =>
                [block.name, block.attribute, block.category].join("_")
              )
              .includes([block.name, block.attribute, choice.name].join("_"))
          )
      );
  const blockRecords: any[] = useRecords(blockTable);
  const getAllowedParameter = (block: Block) =>
    blockRecords
      .filter(
        (record) =>
          record.getCellValue("Block").name === block.name &&
          record.getCellValue("Attribute").name === block.attribute &&
          record.getCellValue("Category").name === block.category
      )
      .filter((choice) =>
        (schema.items.properties?.parameter?.enum ?? []).includes(
          choice.getCellValue("Parameter")
        )
      );

  const addBlock = () => {
    handleChange(path, [...blocks, {}]);
  };

  const removeBlock = (index: number) => {
    blocks.splice(index, 1);
    handleChange(path, [...blocks]);
  };

  const updateBlock = (index: number, property: keyof Block, value: string) => {
    blocks[index] = { ...blocks[index], [property]: value };
    handleChange(path, [...blocks]);
  };

  return (
    <FormGroup>
      {blockRecords &&
        blocks.map((block, blockIndex) => (
          <Grid
            key={`${block.name}-${block.attribute}-${block.category}-${block.parameter}`}
            container
            spacing={2}
          >
            <Grid size={2}>
              <FormControl fullWidth>
                <InputLabel id={`block-${blockIndex}-label`}>Block</InputLabel>
                <Select
                  labelId={`block-${blockIndex}-attribute-label`}
                  id={`block-${blockIndex}-attribute`}
                  value={block.name}
                  label="Block"
                  onChange={(e) =>
                    updateBlock(blockIndex, "name", e.target.value)
                  }
                >
                  {getAllowedBlocks(block).map((choice) => (
                    <MenuItem key={choice.id} value={choice.name}>
                      {choice.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2}>
              <FormControl fullWidth>
                <InputLabel id={`block-${blockIndex}-label`}>
                  Attribute
                </InputLabel>
                <Select
                  labelId={`block-${blockIndex}-attribute-label`}
                  id={`block-${blockIndex}-attribute`}
                  value={block.attribute}
                  label="Attribute"
                  onChange={(e) =>
                    updateBlock(blockIndex, "attribute", e.target.value)
                  }
                  disabled={!block.name}
                >
                  {getAllowedAttribute(block).map((choice) => (
                    <MenuItem key={choice.id} value={choice.name}>
                      {choice.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2}>
              <FormControl fullWidth>
                <InputLabel id={`block-${blockIndex}-label`}>
                  Category
                </InputLabel>
                <Select
                  labelId={`block-${blockIndex}-category-label`}
                  id={`block-${blockIndex}-category`}
                  value={block.category}
                  label="Category"
                  onChange={(e) =>
                    updateBlock(blockIndex, "category", e.target.value)
                  }
                  disabled={!block.attribute || (!block.category && getAllowedCategory(block).length === 0)}
                >
                  {block.category && (
                    <MenuItem value={block.category}>
                      {block.category}
                    </MenuItem>
                  )}
                  {getAllowedCategory(block).map((choice) => (
                    <MenuItem key={choice.id} value={choice.name}>
                      {choice.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <FormControl fullWidth>
                <InputLabel id={`block-${blockIndex}-label`}>
                  Parameter
                </InputLabel>
                <Select
                  labelId={`block-${blockIndex}-parameter-label`}
                  id={`block-${blockIndex}-parameter`}
                  value={block.parameter}
                  label="Parameter"
                  onChange={(e) =>
                    updateBlock(blockIndex, "parameter", e.target.value)
                  }
                  disabled={!block.category}
                >
                  {getAllowedParameter(block).map((choice) => (
                    <MenuItem
                      key={choice.id}
                      value={choice.getCellValue("Parameter")}
                    >
                      {choice.getCellValue("Parameter")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2}>
              <IconButton
                aria-label="delete block"
                onClick={() => removeBlock(blockIndex)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      <Button
        variant="text"
        disabled={blocks.length > 0 && !blocks[blocks.length - 1]?.parameter}
        onClick={() => addBlock()}
      >
        Add Block
      </Button>
    </FormGroup>
  );
}

export default withJsonFormsControlProps(BlockControl);

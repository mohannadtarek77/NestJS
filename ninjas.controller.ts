/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';


@Controller('ninjas')
@UseGuards(BeltGuard) // you added to the entire controller so you can protect an entire controller for all routes / also you can  add it to a specific route to protect it example: authorization (granting access based on permissions) or authentication ( process of verifying identity)
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {}

    //   GET/ninjas --> [] standard
    //   GET/ninjas?type=fast --> [] when adding a query paramter
    @Get()
    getNinjas(@Query('type') weapon: 'stars' | 'nunchucks'){
        return this.ninjasService.getNinjas(weapon);
    }

    // GET/ninjas/:id --> { ... }
    @Get(':id')
    getOneNinja(@Param('id',ParseIntPipe) id: number){        
        try{
            return this.ninjasService.getNinja(id)
        }
        catch(err){
            throw new NotFoundException();
        }
    }

    // POST/ninjas
    @Post()
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto){
        return this.ninjasService.createNinja(createNinjaDto)
    }
    
    // PUT /ninjas/:id --> { ... }
    @Put(':id')
    updateNinjas(@Param('id') id: string,@Body()updateNinjaDto: UpdateNinjaDto){
        return this.ninjasService.updateNinja(+id,updateNinjaDto)
    }

    //DELETE /ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id') id: string){
        return this.ninjasService.removeNinja(+id)
    }

}


